import { Network } from '@ape.swap/swap-v2-sdk';
import { computed, ref } from 'vue';

import config from '@/lib/config';
import { configService } from '@/services/config/config.service';

/**
 * STATE
 */
const DEFAULT_NETWORK_ID =
  process.env.VUE_APP_NETWORK != null
    ? (Number(process.env.VUE_APP_NETWORK) as Network)
    : Network.BSC;

export const networkId = ref<Network>(DEFAULT_NETWORK_ID);

export const isMainnet = computed(() => networkId.value === Network.MAINNET);
export const isBSC = computed(() => networkId.value === Network.BSC);
export const isBSCTestnet = computed(
  () => networkId.value === Network.BSC_TESTNET
);
export const isPolygon = computed(() => networkId.value === (137 as Network));
export const isArbitrum = computed(
  () => networkId.value === (42161 as Network)
);
export const isKovan = computed(() => networkId.value === (42 as Network));
// Balancer Defaults:
// export const isPolygon = computed(() => networkId.value === Network.POLYGON);
// export const isArbitrum = computed(() => networkId.value === Network.ARBITRUM);
// export const isKovan = computed(() => networkId.value === Network.KOVAN);

export const isL2 = computed(() => false);
// Balancer Defaults:
// export const isL2 = computed(() => isPolygon.value || isArbitrum.value);

/**
 * METHODS
 */
export function setNetworkId(id: Network) {
  networkId.value = id;
}

export function networkFor(key: string | number): Network {
  switch (key.toString()) {
    case '56':
      return Network.BSC;
    case '97':
      return Network.BSC_TESTNET;
    case '1':
      return Network.MAINNET;
    // Balancer Defaults:
    // case '42':
    //   return Network.KOVAN;
    // case '97':
    //   return Network.BSC_TESTNET;
    // case '137':
    //   return Network.POLYGON;
    // case '42161':
    //   return Network.ARBITRUM;
    default:
      throw new Error('Network not supported');
  }
}

export function networkNameFor(network: Network): string {
  return config[network].network;
}

export function subdomainFor(network: Network): string {
  switch (network) {
    case Network.BSC:
      return 'app';
    case Network.BSC_TESTNET:
      return 'testnet.bsc';
    case Network.MAINNET:
      return 'eth';
    // Balancer Defaults:
    // case Network.KOVAN:
    //   return 'kovan';
    // case Network.POLYGON:
    //   return 'polygon';
    // case Network.ARBITRUM:
    //   return 'arbitrum';
    default:
      throw new Error('Network not supported');
  }
}

export function blocktimeFor(network: Network): number {
  switch (network) {
    case Network.MAINNET:
      return 13;
    case Network.BSC:
      return 3;
    case Network.BSC_TESTNET:
      return 3;
    // Balancer Defaults:
    // case Network.POLYGON:
    //   return 2;
    // case Network.ARBITRUM:
    //   return 3;
    // case Network.KOVAN:
    //   // Should be ~4s but this causes subgraph to return with unindexed block error.
    //   return 1;
    default:
      return 3;
  }
}

export function urlFor(network: Network): string {
  const subdomain = subdomainFor(network);
  const host = configService.env.APP_HOST;
  return `https://${subdomain}.${host}/#`;
}

export default function useNetwork() {
  return {
    setNetworkId,
    networkId
  };
}
