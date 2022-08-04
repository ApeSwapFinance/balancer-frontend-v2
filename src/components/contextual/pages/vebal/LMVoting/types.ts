import { Network } from '@ape.swap/swap-v2-sdk';

import { PoolType } from '@/services/balancer/subgraph/types';

export type Pool = {
  id: string;
  poolType: PoolType;
  tokens: Array<{
    address: string;
    symbol: string;
    weight: string;
  }>;
  chain: Network;
};
