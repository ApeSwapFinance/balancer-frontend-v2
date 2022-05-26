import { BalancerSDK, BalancerSdkConfig, Network } from '@balancer-labs/sdk';

import { configService } from '@/services/config/config.service';

const network = ((): Network => {
  switch (configService.network.key) {
    case '1':
      return Network.MAINNET;
    case '42':
      return Network.KOVAN;
    case '137':
      return Network.POLYGON;
    case '42161':
      return Network.ARBITRUM;
    default:
      return Network.MAINNET;
  }
})();

const sdkConfig = ((): BalancerSdkConfig => {
  const { key } = configService.network;

  let config: BalancerSdkConfig = {
    network,
    rpcUrl: configService.rpc,
  }

  // Skip multicall balance fetching when running a local node.
  // Otherwise it gets really slow and will probably crash.
  if (key === '31337') {
    config = {
      ...config,
      sor: {
        fetchOnChainBalances: false
      }
    }
  }

  return config;
})

export const balancer = new BalancerSDK(sdkConfig());
