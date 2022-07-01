<script setup lang="ts">
import { PoolToken } from '@/services/balancer/subgraph/types';

import BalanceTooltip from './BalanceTooltip.vue';

type Props = {
  hasBalance: boolean;
  symbol: string;
  isSelected: boolean;
  token: PoolToken;
};

withDefaults(defineProps<Props>(), {
  hasBalance: false,
  isSelected: false
});
</script>

<template>
  <BalTooltip
    :disabled="!hasBalance"
    class="mr-1 last:mr-0 cursor-pointer leading-normal"
    textAlign="left"
    :delayMs="50"
  >
    <template v-slot:activator>
      <div
        :class="[
          'pill',
          {
            'pill-selected': isSelected,
            'pill-hoverable': hasBalance
          }
        ]"
      >
        <div v-if="hasBalance" class="balance-indicator" />
        <div
          :class="[
            'pill-text text-primary dark:text-primary-bright',
            {
              'font-medium': isSelected
            }
          ]"
        >
          {{ symbol }}
        </div>
      </div>
    </template>
    <BalanceTooltip :token="token" :symbol="symbol" />
  </BalTooltip>
</template>

<style scoped>
.pill {
  @apply flex;
  @apply relative;
  @apply my-px;
  @apply h-full;
}

.pill::before {
  @apply w-full h-full;
  @apply absolute;
  @apply bg-white3 dark:bg-white3-dark;
  content: '';
  transform: skew(-12deg);
}

.pill:first-child::before {
  border-radius: 4px 0px 0px 4px;
}

.pill:last-child::before {
  border-radius: 0px 4px 4px 0px;
}

.pill:only-child::before {
  border-radius: 4px 4px 4px 4px;
}

.pill-text {
  @apply px-2 py-1;
  z-index: 1;
}

.pill-selected::before {
  @apply ring-2 ring-primary dark:ring-primary-bright;
}

.balance-indicator {
  @apply w-3 h-3;
  @apply rounded-full border-2 border-white1;
  @apply bg-success;
  @apply absolute top-0 right-0 -mt-1 -mr-2;
}

.pill-hoverable:hover::before,
.pill-hoverable:focus::before {
  @apply bg-white1 dark:bg-white1-dark;
}
</style>
