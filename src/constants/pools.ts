import { Network } from '@ape.swap/swap-v2-sdk';

import { isMainnet, networkId } from '@/composables/useNetwork';

import { USE_DUMMY } from './env';

export const MIN_FIAT_VALUE_POOL_MIGRATION = isMainnet.value ? 100_000 : 1; // 100K USD or $1 for other networks

// Do not display APR values greater than this amount; they are likely to be nonsensical
// These can arise from pools with extremely low balances (e.g., completed LBPs)
export const APR_THRESHOLD = 10_000;

export type FactoryType =
  | 'oracleWeightedPool'
  | 'weightedPool'
  | 'stablePool'
  | 'managedPool'
  | 'liquidityBootstrappingPool'
  | 'boostedPool';

export type Pools = {
  IdsMap: Partial<Record<'staBAL' | 'bbAaveUSD' | 'B-80BAL-20WETH', string>>;
  Pagination: {
    PerPage: number;
    PerPool: number;
    PerPoolInitial: number;
  };
  DelegateOwner: string;
  ZeroAddress: string;
  DynamicFees: {
    Gauntlet: string[];
  };
  BlockList: string[];
  ExcludedPoolTypes: string[];
  Stable: {
    AllowList: string[];
  };
  Investment: {
    AllowList: string[];
  };
  Factories: Record<string, FactoryType>;
  Stakable: {
    AllowList: string[];
  };
};

// TODO: A|S Update: POOLS_BSC
const POOLS_BSC: Pools = {
  IdsMap: {},
  Pagination: {
    PerPage: 10,
    PerPool: 10,
    PerPoolInitial: 5
  },
  DelegateOwner: '0xba1ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1b',
  ZeroAddress: '0x0000000000000000000000000000000000000000',
  DynamicFees: {
    Gauntlet: []
  },
  BlockList: [''],
  ExcludedPoolTypes: [
    'OlaLinear',
    'Element',
    'AaveLinear',
    'Linear',
    'ERC4626Linear'
  ],
  Stable: {
    AllowList: [
      '', // StablePhantomPool
      '' // ApeSwap Weighted WBNB/Stable USD
    ]
  },
  Investment: {
    AllowList: [
      '', // StablePhantomPool
      '' // ApeSwap Weighted WBNB/Stable USD
    ]
  },
  Factories: {},
  Stakable: {
    // NOTE: Whitelist poolIds here for staking on the UI
    AllowList: [
      '', // StablePhantomPool
      '' // ApeSwap Weighted WBNB/Stable USD
    ]
  }
};

const POOLS_BSC_DUMMY: Pools = {
  IdsMap: {},
  Pagination: {
    PerPage: 10,
    PerPool: 10,
    PerPoolInitial: 5
  },
  DelegateOwner: '0xba1ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1b',
  ZeroAddress: '0x0000000000000000000000000000000000000000',
  DynamicFees: {
    Gauntlet: []
  },
  BlockList: [''],
  ExcludedPoolTypes: [
    'OlaLinear',
    'Element',
    'AaveLinear',
    'Linear',
    'ERC4626Linear'
  ],
  Stable: {
    AllowList: [
      '0x4c6061c46eb89ec670deb69a176a7799c3b4141c000000000000000000000016', // StablePhantomPool
      '0xfa872c3b34ca355f23e41fe7306126795ba8d8cd000200000000000000000018' // ApeSwap Weighted WBNB/Stable USD
    ]
  },
  Investment: {
    AllowList: [
      '0x4c6061c46eb89ec670deb69a176a7799c3b4141c000000000000000000000016', // StablePhantomPool
      '0xfa872c3b34ca355f23e41fe7306126795ba8d8cd000200000000000000000018' // ApeSwap Weighted WBNB/Stable USD
    ]
  },
  Factories: {
    '0xe7C30cadBeb9D707F857eE8a1145688F7A5eDaBc': 'weightedPool' // 2 Token
    // '': 'stablePool',
  },
  Stakable: {
    // NOTE: Whitelist poolIds here for staking on the UI
    AllowList: [
      '0x4c6061c46eb89ec670deb69a176a7799c3b4141c000000000000000000000016', // StablePhantomPool
      '0xfa872c3b34ca355f23e41fe7306126795ba8d8cd000200000000000000000018' // ApeSwap Weighted WBNB/Stable USD
    ]
  }
};

// TODO: A|S Update: POOLS_BSC_TESTNET
const POOLS_BSC_TESTNET: Pools = {
  IdsMap: {},
  Pagination: {
    PerPage: 10,
    PerPool: 10,
    PerPoolInitial: 5
  },
  DelegateOwner: '0xba1ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1b',
  ZeroAddress: '0x0000000000000000000000000000000000000000',
  DynamicFees: {
    Gauntlet: []
  },
  BlockList: [''],
  ExcludedPoolTypes: [
    'OlaLinear',
    'Element',
    'AaveLinear',
    'Linear',
    'ERC4626Linear'
  ],
  Stable: {
    AllowList: [
      '', // StablePhantomPool
      '' // ApeSwap Weighted WBNB/Stable USD
    ]
  },
  Investment: {
    AllowList: [
      '', // StablePhantomPool
      '' // ApeSwap Weighted WBNB/Stable USD
    ]
  },
  Factories: {},
  Stakable: {
    // NOTE: Whitelist poolIds here for staking on the UI
    AllowList: [
      '', // StablePhantomPool
      '' // ApeSwap Weighted WBNB/Stable USD
    ]
  }
};

const POOLS_GENERIC: Pools = {
  IdsMap: {},
  Pagination: {
    PerPage: 10,
    PerPool: 10,
    PerPoolInitial: 5
  },
  DelegateOwner: '0xba1ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1ba1b',
  ZeroAddress: '0x0000000000000000000000000000000000000000',
  DynamicFees: {
    Gauntlet: []
  },
  BlockList: [''],
  ExcludedPoolTypes: ['Element', 'AaveLinear', 'Linear', 'ERC4626Linear'],
  Stable: {
    AllowList: []
  },
  Investment: {
    AllowList: []
  },
  Factories: {},
  Stakable: {
    AllowList: []
  }
};

const POOLS_MAP = {
  // [Network.MAINNET]: POOLS_MAINNET,
  [Network.BSC]: USE_DUMMY ? POOLS_BSC_DUMMY : POOLS_BSC,
  [Network.BSC_TESTNET]: POOLS_BSC_TESTNET
  // Balancer Defaults:
  // [Network.KOVAN]: POOLS_KOVAN,
  // [Network.POLYGON]: POOLS_POLYGON,
  // [Network.ARBITRUM]: POOLS_ARBITRUM,
};
export const POOLS: Pools = POOLS_MAP[networkId.value]
  ? POOLS_MAP[networkId.value]
  : POOLS_GENERIC;
