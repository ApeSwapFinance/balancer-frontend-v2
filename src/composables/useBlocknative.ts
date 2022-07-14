import { Network } from '@ape.swap/swap-v2-sdk';
import BlocknativeSdk from 'bnc-sdk';
import { computed, inject } from 'vue';

import { bnSdkSymbol } from '@/plugins/blocknative';
import useWeb3 from '@/services/web3/useWeb3';

const SUPPORTED_NETWORKS = [
  Network.MAINNET,
  Network.BSC,
  Network.BSC_DUMMY,
  Network.BSC_TESTNET,
  // Balancer Defauls:
  // Network.KOVAN,
  // Network.RINKEBY,
  // Network.ROPSTEN,
  // Network.GÖRLI,
  // Network.POLYGON
];

export default function useBlocknative() {
  const { appNetworkConfig } = useWeb3();

  const blocknative = inject(bnSdkSymbol) as BlocknativeSdk;
  if (!blocknative) throw new Error('Blocknative SDK missing!');

  // TODO: blocknative is going to be deprecated for transaction tracking.
  const supportsBlocknative = computed(() =>
    SUPPORTED_NETWORKS.includes(appNetworkConfig.chainId)
  );

  return {
    blocknative,
    supportsBlocknative
  };
}
