import { Network } from '@ape.swap/swap-v2-sdk';

import { PoolToken, PoolType } from '@/services/balancer/subgraph/types';

import ALL_VOTING_GAUGES from '../../public/data/voting-gauges.json';

export type VotingGauge = {
  address: string;
  network: Network;
  pool: {
    id: string;
    address: string;
    poolType: PoolType;
    symbol: string | undefined;
    tokens: Pick<PoolToken, 'address' | 'weight' | 'symbol'>[];
  };
  tokenLogoURIs: Record<string, string | undefined>;
};

export const KOVAN_VOTING_GAUGES: VotingGauge[] = (ALL_VOTING_GAUGES as VotingGauge[]).filter(
  gauge => gauge.network === (42 as any)
  // Balancer Default:
  // gauge => gauge.network === Network.KOVAN
);

export const MAINNET_VOTING_GAUGES: VotingGauge[] = (ALL_VOTING_GAUGES as VotingGauge[]).filter(
  gauge => gauge.network === Network.MAINNET
  // Balancer Default:
  // gauge => gauge.network !== Network.KOVAN
);

export const VEBAL_VOTING_GAUGE:
  | VotingGauge
  | undefined = (ALL_VOTING_GAUGES as VotingGauge[]).find(
  gauge => gauge.pool.symbol === 'veBAL'
);
