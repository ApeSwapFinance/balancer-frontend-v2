import { Network } from '@ape.swap/swap-v2-sdk';

import { networkId } from '@/composables/useNetwork';
import { configService } from '@/services/config/config.service';

/**
 * TYPES
 */
type CommonTokens = {
  nativeAsset: string;
  wNativeAsset: string;
  WETH: string;
  // TODO: A|S Setting BAL token to BANANA. Make update the variable?
  // BANANA: string;
  BAL: string;
  bbaUSD?: string;
};

type TokenConstants = {
  Popular: {
    Symbols: string[];
  };
  Addresses: CommonTokens;
  PriceChainMap?: Record<string, string>;
};

/**
 * CONSTANTS
 */
export const NATIVE_ASSET_ADDRESS = configService.network.nativeAsset.address;
export const DEFAULT_TOKEN_DECIMALS = 18;

export const TOKENS_MAINNET: TokenConstants = {
  Popular: {
    Symbols: ['BANANA', 'WBTC', 'BUSD', 'USDT', 'USDC', 'WETH']
  },
  Addresses: {
    nativeAsset: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    wNativeAsset: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    WETH: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    // TODO: A|S ETH mainnet token address
    BAL: ''
  }
};

export const TOKENS_BSC: TokenConstants = {
  Popular: {
    Symbols: ['BANANA', 'BTCB', 'ETH', 'BUSD', 'USDT', 'USDC', 'WBNB']
  },
  Addresses: {
    nativeAsset: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    wNativeAsset: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    WETH: '0x2170Ed0880ac9A755fd29B2688956BD959F933F8',
    BAL: '0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95' // NOTE: BANANA token
  }
};

export const TOKENS_BSC_TESTNET: TokenConstants = {
  Popular: {
    Symbols: ['BANANA', 'BTCB', 'ETH', 'BUSD', 'USDT', 'USDC', 'WBNB']
  },
  Addresses: {
    nativeAsset: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    wNativeAsset: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
    WETH: '',
    BAL: '0x4Fb99590cA95fc3255D9fA66a1cA46c43C34b09a' // NOTE: BANANA token
  }
};

export const TOKENS_GENERIC: TokenConstants = {
  Popular: {
    Symbols: ['WBTC', 'DAI', 'USDC', 'BAL', 'AAVE', 'WETH']
  },
  Addresses: {
    nativeAsset: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    wNativeAsset: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
    WETH: '0x0000000000000000000000000000000000000000',
    BAL: '0x0000000000000000000000000000000000000000'
  }
};

const TOKENS_MAP = {
  [Network.MAINNET]: TOKENS_MAINNET,
  [Network.BSC]: TOKENS_BSC,
  [Network.BSC_TESTNET]: TOKENS_BSC_TESTNET
};

export const TOKENS: TokenConstants = TOKENS_MAP[networkId.value]
  ? TOKENS_MAP[networkId.value]
  : TOKENS_GENERIC;
