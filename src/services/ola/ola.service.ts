import { getAddress } from '@ethersproject/address';
import { formatUnits } from '@ethersproject/units';
import BigNumber from 'bignumber.js';

import { FiatCurrency } from '@/constants/currency';
import { bnum } from '@/lib/utils';
import { TokenPrices } from '@/services/coingecko/api/price.service';

import { Pool } from '../balancer/subgraph/types';
import { ERC20Multicaller } from '../multicalls/erc20.multicaller';

export default class OlaService {
  private calculateSupplyAPRForOToken(
    supplyRatePerSecond: string | BigNumber
  ): BigNumber {
    const dailyAPR = bnum(supplyRatePerSecond)
      .div(bnum(1e18))
      .times(bnum('86400'));

    const yearlyAPY = dailyAPR
      .plus(bnum('1'))
      .pow(bnum('365'))
      .minus(bnum('1'));

    return yearlyAPY;
  }

  /**
   * Supply APYs can can be calculated for Ola markets using the formula provided by Compound,
   * EXCEPT `blocks-per-day` should be replaced with `seconds-per-day` (86,400)
   *
   * See "Calculating the APY Using Rate Per Block": https://compound.finance/docs#protocol-math
   */
  public async calcWeightedSupplyAPRFor(
    pool: Pool,
    prices: TokenPrices,
    currency: FiatCurrency
  ) {
    const { mainTokens, wrappedTokens, linearPoolTokensMap } = pool;

    const wrappedTokenBalances = wrappedTokens?.map(
      token => linearPoolTokensMap?.[token].balance || ''
    );
    const hasAllWrappedTokenBalances =
      wrappedTokenBalances && wrappedTokenBalances.every(balance => !!balance);

    const multicaller = new ERC20Multicaller();

    wrappedTokens?.forEach((address, i) => {
      multicaller.call(`olaUnderlyingTokens[${i}]`, address, 'underlying');
      multicaller.call(
        `supplyRatesPerSecond[${i}]`,
        address,
        // NOTE: `supplyRatePerBlock` is left from Compound code, but Ola's value is for "supplyRaterPerSecond"
        'supplyRatePerBlock'
      );
      multicaller.call(
        `linearPoolTotalSupplies[${i}]`,
        pool.tokensList[i],
        'getVirtualSupply'
      );
    });

    const {
      olaUnderlyingTokens,
      supplyRatesPerSecond,
      linearPoolTotalSupplies
    } = await multicaller.execute();

    const unwrappedTokens = wrappedTokens?.map((_, i) => {
      return olaUnderlyingTokens[i].toLowerCase();
    });

    if (
      !mainTokens ||
      !wrappedTokens ||
      !unwrappedTokens ||
      !hasAllWrappedTokenBalances
    ) {
      return { total: '0', breakdown: {} };
    }

    let total = bnum(0);
    const breakdown: Record<string, string> = {};

    unwrappedTokens.forEach((unwrappedOlaToken, unwrappedIndex) => {
      const supplyAPR = this.calculateSupplyAPRForOToken(
        supplyRatesPerSecond[unwrappedIndex]
      );

      if (supplyAPR.gt(0)) {
        const tokenIndex = mainTokens.findIndex(
          token => token === getAddress(unwrappedOlaToken)
        );

        // TEST: ola.service.ts Need to test logic below here
        // Grabs the matching wrapped which generates the yield
        const wrappedToken = wrappedTokens[tokenIndex];
        const mainToken = mainTokens[tokenIndex];
        const linearPoolAddress = pool.tokenAddresses[tokenIndex];
        const linearPoolToken = pool.tokens.find(
          token => token.address === linearPoolAddress
        );
        const linearPoolTotalSupply = formatUnits(
          linearPoolTotalSupplies[tokenIndex],
          18
        );

        if (prices[mainToken] != null && linearPoolTotalSupply) {
          const price = prices[mainToken][currency] || 0;
          const balance = wrappedTokenBalances[tokenIndex];
          const linearPoolBalance = linearPoolToken?.balance || '0';
          const linearPoolShare = bnum(linearPoolBalance).div(
            linearPoolTotalSupply
          );
          const actualBalance = bnum(balance).times(linearPoolShare);
          const value = bnum(actualBalance).times(price);
          const weightedAPR = value.times(supplyAPR).div(pool.totalLiquidity);

          breakdown[wrappedToken] = weightedAPR.toString();

          total = total.plus(weightedAPR);
        }
      }
    });

    return {
      total: total.toString(),
      breakdown
    };
  }
}

export const olaService = new OlaService();
