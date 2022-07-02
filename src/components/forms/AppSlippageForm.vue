<script setup lang="ts">
import { computed, reactive, watch } from 'vue';

import useNumbers from '@/composables/useNumbers';
import useUserSettings from '@/composables/useUserSettings';
import { bnum } from '@/lib/utils';

const FIXED_OPTIONS = ['0.005', '0.01', '0.02'];

/**
 * COMPOSABLES
 */
const { fNum2 } = useNumbers();
const { slippage, setSlippage } = useUserSettings();

/**
 * STATE
 */
const state = reactive({
  fixedSlippage: '',
  customSlippage: '',
  isCustomInput: false
});

const options = FIXED_OPTIONS.map(option => {
  return {
    label: fNum2(option, {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
      fixedFormat: true
    }),
    value: option
  };
});

/**
 * COMPUTED
 */
const isFixedSlippage = computed(() => {
  return FIXED_OPTIONS.includes(slippage.value);
});

const customInputClasses = computed(() => ({
  'border border-white4': !isFixedSlippage.value || state.isCustomInput,
  'border-gray dark:border-gray-dark':
    isFixedSlippage.value && !state.isCustomInput
}));

/**
 * METHODS
 */
function onFixedInput(val: string): void {
  state.isCustomInput = false;
  state.customSlippage = '';
  setSlippage(val);
}

function onCustomInput(val: string): void {
  state.isCustomInput = true;
  val = bnum(val)
    .div(100)
    .toString();
  setSlippage(val);
}

/**
 * WATCHERS
 */
watch(
  slippage,
  newSlippage => {
    if (isFixedSlippage.value && !state.isCustomInput) {
      state.fixedSlippage = newSlippage;
      state.customSlippage = '';
    } else {
      state.customSlippage = bnum(newSlippage)
        .times(100)
        .toString();
      state.fixedSlippage = '';
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="flex">
    <BalBtnGroup
      :options="options"
      v-model="state.fixedSlippage"
      @update:modelValue="onFixedInput"
    />
    <div :class="['custom-input mod-input', customInputClasses]">
      <input
        class="w-12 text-right bg-white2 dark:bg-white2-dark"
        v-model="state.customSlippage"
        placeholder="0.1"
        type="number"
        step="any"
        min="0"
        @update:modelValue="onCustomInput"
      />
      <div class="px-2">
        %
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-input {
  @apply flex items-center px-1 rounded-lg;
}
.mod-input {
  @apply border border-gray dark:border-gray-dark;
}
</style>
