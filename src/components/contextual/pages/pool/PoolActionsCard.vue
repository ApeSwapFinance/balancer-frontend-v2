<script setup lang="ts">
import { computed, toRef } from 'vue';

import useWithdrawMath from '@/components/forms/pool_actions/WithdrawForm/composables/useWithdrawMath';
import useNumbers, { FNumFormats } from '@/composables/useNumbers';
import { lpTokensFor } from '@/composables/usePool';
import useTokens from '@/composables/useTokens';
import { bnum } from '@/lib/utils';
import { FullPool } from '@/services/balancer/subgraph/types';
import useWeb3 from '@/services/web3/useWeb3';

/**
 * TYPES
 */
type Props = {
  pool: FullPool;
  missingPrices: boolean;
};

/**
 * PROPS
 */
const props = defineProps<Props>();

/**
 * COMPOSABLES
 */
const { hasBpt } = useWithdrawMath(toRef(props, 'pool'));
const { balanceFor, nativeAsset, wrappedNativeAsset } = useTokens();
const { fNum2, toFiat } = useNumbers();
const { isWalletReady, toggleWalletSelectModal } = useWeb3();

/**
 * COMPUTED
 */
const fiatTotal = computed(() => {
  const fiatValue = lpTokensFor(props.pool)
    .map(address => {
      let tokenBalance = '0';

      if (address === wrappedNativeAsset.value.address) {
        const wrappedBalance = balanceFor(address);
        const nativeBalance = balanceFor(nativeAsset.address);
        tokenBalance = bnum(nativeBalance).gt(wrappedBalance)
          ? nativeBalance
          : wrappedBalance;
      } else {
        tokenBalance = balanceFor(address);
      }

      return toFiat(tokenBalance, address);
    })
    .reduce((total, value) =>
      bnum(total)
        .plus(value)
        .toString()
    );

  return fNum2(fiatValue, FNumFormats.fiat);
});
</script>

<template>
  <div class="p-4 w-full bg-white3 dark:bg-white3-dark">
    <div class="text-xs text-gray dark:text-gray-dark text-sm">
      {{ $t('basedOnTokensInWallet') }}
    </div>
    <div
      class="flex justify-between items-center mb-4 text-primary dark:text-primary-bright"
    >
      <h5>
        {{ $t('youCanInvest') }}
      </h5>
      <h5>
        {{ isWalletReady ? fiatTotal : '-' }}
      </h5>
    </div>

    <BalBtn
      v-if="!isWalletReady"
      :label="$t('connectWallet')"
      color="ape-yellow"
      block
      @click="toggleWalletSelectModal"
    />
    <div v-else class="grid gap-2 grid-cols-2">
      <BalBtn
        tag="router-link"
        :to="{ name: 'invest' }"
        :label="$t('invest')"
        color="ape-yellow"
        block
      />
      <BalBtn
        :tag="hasBpt ? 'router-link' : 'div'"
        :to="{ name: 'withdraw' }"
        :label="$t('withdraw.label')"
        :disabled="!hasBpt"
        tertiary
        block
      />
    </div>
  </div>
</template>
