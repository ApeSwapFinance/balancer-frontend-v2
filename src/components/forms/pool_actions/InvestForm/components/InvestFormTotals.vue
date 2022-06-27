<script setup lang="ts">
import { computed, toRefs } from 'vue';

import useNumbers, { FNumFormats } from '@/composables/useNumbers';
import useWeb3 from '@/services/web3/useWeb3';

import { InvestMathResponse } from '../composables/useInvestMath';

/**
 * TYPES
 */
type Props = {
  math: InvestMathResponse;
};

/**
 * Props
 */
const props = defineProps<Props>();

const emit = defineEmits<{
  (e: 'maximize'): void;
  (e: 'optimize'): void;
}>();

/**
 * COMPOSABLES
 */
const { fNum2 } = useNumbers();
const { isWalletReady } = useWeb3();

const {
  fiatTotal,
  hasNoBalances,
  hasAllTokens,
  priceImpact,
  highPriceImpact,
  maximized,
  optimized,
  batchSwapLoading,
  supportsPropotionalOptimization
} = toRefs(props.math);

/**
 * COMPUTED
 */
const priceImpactClasses = computed(() => ({
  'dark:bg-white3-dark': !highPriceImpact.value,
  'bg-error dark:bg-error text-primary-bright divide-error':
    highPriceImpact.value
}));

const optimizeBtnClasses = computed(() => ({
  'text-gradient': !highPriceImpact.value,
  'text-error px-2 py-1 bg-white1 rounded-lg': highPriceImpact.value
}));
</script>

<template>
  <div class="data-table">
    <div class="data-table-row total-row">
      <div class="p-2">{{ $t('total') }}</div>
      <div class="data-table-number-col">
        {{ fNum2(fiatTotal, FNumFormats.fiat) }}
        <div v-if="isWalletReady && !hasNoBalances" class="text-sm">
          <span v-if="maximized" class="text-gray dark:text-gray-dark">
            {{ $t('maxed') }}
          </span>
          <span
            v-else
            class="text-ape-yellow cursor-pointer"
            @click="emit('maximize')"
          >
            {{ $t('max') }}
          </span>
        </div>
      </div>
    </div>
    <div :class="['data-table-row price-impact-row', priceImpactClasses]">
      <div class="p-2">{{ $t('priceImpact') }}</div>
      <div class="data-table-number-col">
        <div class="flex">
          <span v-if="!batchSwapLoading">
            {{ fNum2(priceImpact, FNumFormats.percent) }}
          </span>
          <BalLoadingBlock v-else class="w-10" />

          <BalTooltip :text="$t('customAmountsTip')">
            <template v-slot:activator>
              <BalIcon
                v-if="highPriceImpact"
                name="alert-triangle"
                size="xs"
                class="-mb-px ml-1"
              />
              <BalIcon
                v-else
                name="info"
                size="xs"
                class="text-gray -mb-px ml-1"
              />
            </template>
          </BalTooltip>
        </div>

        <div
          v-if="
            isWalletReady && hasAllTokens && supportsPropotionalOptimization
          "
          class="text-sm font-bold"
        >
          <span v-if="optimized" class="text-gray dark:text-gray-dark">
            {{ $t('optimized') }}
          </span>
          <div
            v-else
            :class="['cursor-pointer', optimizeBtnClasses]"
            @click="emit('optimize')"
          >
            {{ $t('optimize') }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-table {
  @apply border dark:border-white1-dark rounded-lg divide-y dark:divide-white1-dark;
}

.data-table-row {
  @apply grid grid-cols-4 items-center;
  @apply divide-x dark:divide-white1-dark;
}

.data-table-number-col {
  @apply col-span-3 p-2 flex items-center justify-between;
}

.total-row {
  @apply text-lg font-bold rounded-t-lg dark:bg-white3-dark;
}

.price-impact-row {
  @apply text-sm rounded-b-lg;
}
</style>
