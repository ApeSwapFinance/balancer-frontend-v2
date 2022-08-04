import { Network } from '@ape.swap/swap-v2-sdk';

import { USE_DUMMY } from '@/constants/env';

import bsc from './bsc.json';
import bscDummy from './bsc-dummy.json';
import bscTestnet from './bsc-testnet.json';
import docker from './docker.json';

export interface Config {
  key: string;
  chainId: Network | 12345 | 17;
  chainName: string;
  name: string;
  shortName: string;
  network: string;
  portisNetwork?: string;
  unknown: boolean;
  rpc: string;
  publicRpc?: string;
  ws: string;
  loggingRpc: string;
  explorer: string;
  explorerName: string;
  subgraph: string;
  poolsUrlV2: string;
  subgraphs: {
    aave: string;
    gauge: string;
  };
  supportsEIP1559: boolean;
  supportsElementPools: boolean;
  nativeAsset: {
    name: string;
    address: string;
    symbol: string;
    decimals: number;
    deeplinkId: string;
    logoURI: string;
    minTransactionBuffer: string;
  };
  addresses: {
    merkleRedeem: string;
    merkleOrchard: string;
    multicall: string;
    vault: string;
    weightedPoolFactory: string;
    stablePoolFactory: string;
    weth: string;
    stETH: string;
    wstETH: string;
    lidoRelayer: string;
    balancerHelpers: string;
    batchRelayer: string;
    veBAL: string;
    gaugeController: string;
    gaugeFactory: string;
    balancerMinter: string;
    tokenAdmin: string;
    veDelegationProxy: string;
    veBALHelpers: string;
    feeDistributor: string;
  };
  keys: {
    infura: string;
    alchemy: string;
  };
  strategies: Record<
    string,
    {
      type: string;
      name: string;
    }
  >;
  gauges: {
    type: number;
    weight: number;
  };
}

const config: Record<Network | number, Config> = {
  [Network.BSC]: USE_DUMMY ? bscDummy : bsc,
  [Network.BSC_TESTNET]: bscTestnet,
  // NOTE: ApeSwap Update: Remove default Balancer configs:
  // [Network.MAINNET]: homestead,
  // [Network.KOVAN]: kovan,
  // [Network.RINKEBY]: rinkeby,
  // [Network.POLYGON]: polygon,
  // [Network.ARBITRUM]: arbitrum,
  // @ts-ignore
  17: docker
};

export default config;
