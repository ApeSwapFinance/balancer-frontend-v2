import { reactive, toRefs } from 'vue';

import { balancer } from '@/lib/balancer.sdk';

type InvestState = {
  amounts: string[];
  tokenAddresses: string[];
  propAmounts: string[];
  validInputs: boolean[];
  highPriceImpactAccepted: boolean;
  submitting: boolean;
  sorReady: boolean;
};

/**
 * STATE
 */
const state = reactive<InvestState>({
  amounts: [],
  tokenAddresses: [],
  propAmounts: [],
  validInputs: [],
  highPriceImpactAccepted: false,
  submitting: false,
  sorReady: false
});

/**
 * // NOTE: A|S Docs
 *
 * There is definitely a "balancing" act *wink wink* happening here with the string
 *  of modules.
 *
 * export class BalancerSDK implements BalancerSDKRoot
 *    public sor = new Sor(config)
 * https://github.com/ApeSwapFinance/apeswap-swap-v2-sdk/blob/e1a36fcdac2f572eaee8ac1ec55f3b3ced9bc028/balancer-js/src/modules/sdk.module.ts#L31
 *
 * export class Sor extends SOR
 * https://github.com/ApeSwapFinance/apeswap-swap-v2-sdk/blob/e1a36fcdac2f572eaee8ac1ec55f3b3ced9bc028/balancer-js/src/modules/sor/sor.module.ts#L17
 *
 * export class SOR
 * https://github.com/balancer-labs/balancer-sor/blob/0e853ce35509cb38887b8320cd0d4acc67ac40c2/src/wrapper.ts#L29
 *
 * private readonly defaultSwapOptions: SwapOptions (used in async sor.getSwaps())
 * https://github.com/balancer-labs/balancer-sor/blob/0e853ce35509cb38887b8320cd0d4acc67ac40c2/src/wrapper.ts#L34
 */
const sor = balancer.sor;

/**
 * METHODS
 */
function resetAmounts(): void {
  state.amounts = [];
}

export default function useInvestState() {
  return {
    ...toRefs(state),
    sor,
    resetAmounts
  };
}
