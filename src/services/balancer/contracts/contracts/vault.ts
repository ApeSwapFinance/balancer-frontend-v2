import { toNormalizedWeights } from '@ape.swap/swap-v2-sdk';
import { Vault__factory } from '@balancer-labs/typechain';
import { getAddress } from '@ethersproject/address';
import { BigNumber } from '@ethersproject/bignumber';
import { formatUnits } from '@ethersproject/units';
import { Contract } from 'ethers';
import { pick } from 'lodash';

import {
  isStableLike,
  isStablePhantom,
  isTradingHaltable,
  isWeightedLike
} from '@/composables/usePool';
import VaultAbi from '@/lib/abi/VaultAbi.json';
import { Multicaller } from '@/lib/utils/balancer/contract';
import { TokenInfoMap } from '@/types/TokenList';

import {
  LinearPoolDataMap,
  OnchainPoolData,
  OnchainTokenDataMap,
  PoolType,
  RawLinearPoolData,
  RawLinearPoolDataMap,
  RawOnchainPoolData,
  RawPoolTokens
} from '../../subgraph/types';
import Service from '../balancer-contracts.service';
import ProtocolFeesCollector from './protocol-fees-collector';

export default class Vault {
  service: Service;
  instance: Contract;

  constructor(service: Service, instanceABI = VaultAbi) {
    this.service = service;
    this.instance = new Contract(
      this.service.config.addresses.vault,
      instanceABI,
      this.service.provider
    );
  }

  public get protocolFeesCollector(): ProtocolFeesCollector {
    return new ProtocolFeesCollector(this);
  }

  public async getPoolData(
    id: string,
    type: PoolType,
    tokens: TokenInfoMap
  ): Promise<OnchainPoolData> {
    const poolAddress = getAddress(id.slice(0, 42));
    let result = <RawOnchainPoolData>{};

    const vaultMultiCaller = new Multicaller(
      this.service.config.key,
      this.service.provider,
      Vault__factory.abi
    );

    const poolMulticaller = new Multicaller(
      this.service.config.key,
      this.service.provider,
      this.service.allPoolABIs
    );

    poolMulticaller.call('totalSupply', poolAddress, 'totalSupply');
    poolMulticaller.call('decimals', poolAddress, 'decimals');
    poolMulticaller.call('swapFee', poolAddress, 'getSwapFeePercentage');

    if (isWeightedLike(type)) {
      poolMulticaller.call('weights', poolAddress, 'getNormalizedWeights', []);

      if (isTradingHaltable(type)) {
        poolMulticaller.call('swapEnabled', poolAddress, 'getSwapEnabled');
      }
    } else if (isStableLike(type)) {
      poolMulticaller.call('amp', poolAddress, 'getAmplificationParameter');

      if (isStablePhantom(type)) {
        // Overwrite totalSupply with virtualSupply for StablePhantom pools
        poolMulticaller.call('totalSupply', poolAddress, 'getVirtualSupply');

        Object.keys(tokens).forEach((token, i) => {
          poolMulticaller.call(`linearPools.${token}.id`, token, 'getPoolId');
          poolMulticaller.call(
            `linearPools.${token}.priceRate`,
            token,
            'getRate'
          );
          poolMulticaller.call(
            `tokenRates[${i}]`,
            poolAddress,
            'getTokenRate',
            [token]
          );
          poolMulticaller.call(
            `linearPools.${token}.mainToken.address`,
            token,
            'getMainToken'
          );
          poolMulticaller.call(
            `linearPools.${token}.mainToken.index`,
            token,
            'getMainIndex'
          );
          poolMulticaller.call(
            `linearPools.${token}.wrappedToken.address`,
            token,
            'getWrappedToken'
          );
          poolMulticaller.call(
            `linearPools.${token}.wrappedToken.index`,
            token,
            'getWrappedIndex'
          );
          poolMulticaller.call(
            `linearPools.${token}.wrappedToken.rate`,
            token,
            'getWrappedTokenRate'
          );
        });
      }
    }

    result = await poolMulticaller.execute(result);

    if (isStablePhantom(type) && result.linearPools) {
      const wrappedTokensMap: Record<string, string> = {};

      Object.keys(result.linearPools).forEach(address => {
        if (!result.linearPools) return;
        const linearPool: RawLinearPoolData = result.linearPools[address];

        vaultMultiCaller.call(
          `linearPools.${address}.tokenData`,
          this.address,
          'getPoolTokens',
          [linearPool.id]
        );

        wrappedTokensMap[address] = linearPool.wrappedToken.address;
      });

      Object.entries(wrappedTokensMap).forEach(([address, wrappedToken]) => {
        /**
         * // NOTE: A|S Update 2022.07.19
         * The wrapped tokens in the BalancerV2 UI are based on Aave's "aTokens".
         * ApeSwap's boosted pools are based on Ola's "oTokens", which have a different
         * function based on the Ola market contracts.
         *
         * Example Aave contract with `ATOKEN` function:
         * https://etherscan.io/address/0xf8fd466f12e236f4c96f7cce6c79eadb819abf58#readProxyContract
         *
         * Example Ola contract with `underlying` function:
         * https://bscscan.com/address/0xC2E840BdD02B4a1d970C87A912D8576a7e61D314#readProxyContract
         *
         */
        // The method to fetch the unwrapped asset of a linear pool can be
        // different depending on if it's an ERC4626 or StaticAToken interface.
        // Here we just try both methods and merge the result in formatting.
        // poolMulticaller.call(
        //   `linearPools.${address}.unwrappedTokenAddress`,
        //   wrappedToken,
        //   'ATOKEN'
        // );
        // poolMulticaller.call(
        //   `linearPools.${address}.unwrappedERC4626Address`,
        //   wrappedToken,
        //   'asset'
        // );

        poolMulticaller.call(
          `linearPools.${address}.unwrappedTokenAddress`,
          wrappedToken,
          'underlying'
        );

        poolMulticaller.call(
          `linearPools.${address}.totalSupply`,
          address,
          'getVirtualSupply'
        );
      });

      result = await poolMulticaller.execute(result);
    }

    vaultMultiCaller.call('poolTokens', this.address, 'getPoolTokens', [id]);
    result = await vaultMultiCaller.execute(result);

    return this.formatPoolData(result, type, tokens, poolAddress);
  }

  public formatPoolData(
    rawData: RawOnchainPoolData,
    type: PoolType,
    tokens: TokenInfoMap,
    poolAddress: string
  ): OnchainPoolData {
    const poolData = <OnchainPoolData>{};

    // Filter out pre-minted BPT token if exists
    const validTokens = Object.keys(tokens).filter(
      address => address !== poolAddress
    );
    tokens = pick(tokens, validTokens);

    const normalizedWeights = this.normalizeWeights(
      rawData?.weights || [],
      type,
      tokens
    );

    poolData.tokens = this.formatPoolTokens(
      rawData.poolTokens,
      tokens,
      normalizedWeights,
      poolAddress
    );

    poolData.amp = '0';
    if (rawData?.amp) {
      poolData.amp = rawData.amp.value.div(rawData.amp.precision).toString();
    }

    poolData.swapEnabled = true;
    if (rawData.swapEnabled !== undefined) {
      poolData.swapEnabled = rawData.swapEnabled;
    }

    if (rawData?.linearPools) {
      poolData.linearPools = this.formatLinearPools(rawData.linearPools);
    }

    if (rawData.tokenRates) {
      poolData.tokenRates = rawData.tokenRates.map(rate =>
        formatUnits(rate.toString(), 18)
      );
    }

    poolData.totalSupply = formatUnits(rawData.totalSupply, rawData.decimals);
    poolData.decimals = rawData.decimals;
    poolData.swapFee = formatUnits(rawData.swapFee, 18);

    return poolData;
  }

  private formatPoolTokens(
    poolTokens: RawPoolTokens,
    tokenInfo: TokenInfoMap,
    weights: number[],
    poolAddress: string
  ): OnchainTokenDataMap {
    const tokens = <OnchainTokenDataMap>{};

    poolTokens.tokens.forEach((token, i) => {
      const tokenBalance = poolTokens.balances[i];
      const decimals = tokenInfo[token]?.decimals;
      tokens[token] = {
        decimals,
        balance: formatUnits(tokenBalance, decimals),
        weight: weights[i],
        symbol: tokenInfo[token]?.symbol,
        name: tokenInfo[token]?.name,
        logoURI: tokenInfo[token]?.logoURI
      };
    });

    // Remove pre-minted BPT
    delete tokens[poolAddress];

    return tokens;
  }

  private formatLinearPools(
    linearPools: RawLinearPoolDataMap
  ): LinearPoolDataMap {
    const _linearPools = <LinearPoolDataMap>{};

    Object.keys(linearPools).forEach(address => {
      const {
        id,
        mainToken,
        wrappedToken,
        priceRate,
        unwrappedTokenAddress,
        unwrappedERC4626Address,
        tokenData,
        totalSupply
      } = linearPools[address];

      const unwrappedAddress = unwrappedTokenAddress || unwrappedERC4626Address;

      _linearPools[address] = {
        id,
        priceRate: formatUnits(priceRate.toString(), 18),
        mainToken: {
          address: getAddress(mainToken.address),
          index: mainToken.index.toNumber(),
          balance: tokenData.balances[mainToken.index.toNumber()].toString()
        },
        wrappedToken: {
          address: getAddress(wrappedToken.address),
          index: wrappedToken.index.toNumber(),
          balance: tokenData.balances[wrappedToken.index.toNumber()].toString(),
          priceRate: formatUnits(wrappedToken.rate, 18)
        },
        unwrappedTokenAddress: getAddress(unwrappedAddress),
        totalSupply: formatUnits(totalSupply, 18)
      };
    });

    return _linearPools;
  }

  public normalizeWeights(
    weights: BigNumber[],
    type: PoolType,
    tokens: TokenInfoMap
  ): number[] {
    if (isWeightedLike(type)) {
      // toNormalizedWeights returns weights as 18 decimal fixed point
      return toNormalizedWeights(weights).map(w => Number(formatUnits(w, 18)));
    } else if (isStableLike(type)) {
      const tokensList = Object.values(tokens);
      return tokensList.map(() => 1 / tokensList.length);
    } else {
      return [];
    }
  }

  public get address(): string {
    return this.service.config.addresses.vault;
  }
}
