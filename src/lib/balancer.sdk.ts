import { BalancerSDK, Network } from '@ape.swap/swap-v2-sdk';

import { configService } from '@/services/config/config.service';

const network = ((): Network => {
  switch (configService.network.key) {
    case '1':
      return Network.MAINNET;
    case '56':
      return Network.BSC;
    case '-56':
      return Network.BSC_DUMMY;
    case '97':
      return Network.BSC_TESTNET;
    // Balancer Defaults:
    // case '42':
    //   return Network.KOVAN;
    // case '137':
    //   return Network.POLYGON;
    // case '42161':
    //   return Network.ARBITRUM;
    default:
      return Network.BSC;
  }
})();

export const balancer = new BalancerSDK({
  network,
  rpcUrl: configService.rpc
});
