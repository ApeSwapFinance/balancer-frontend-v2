<script setup lang="ts">
import { computed, ref } from 'vue';

import SelectTokenModal from '@/components/modals/SelectTokenModal/SelectTokenModal.vue';
import useNumbers from '@/composables/useNumbers';
import useTokens from '@/composables/useTokens';
import { TokenInfo } from '@/types/TokenList';

/**
 * TYPES
 */
type Props = {
  modelValue: string;
  fixed?: boolean;
  weight?: number | string;
  excludedTokens?: string[];
  options?: string[];
  disableInjection?: boolean;
};

/**
 * PROPS & EMITS
 */
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  fixed: false,
  weight: 0,
  excludedTokens: () => [],
  options: () => [],
  disableInjection: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

/**
 * STATE
 */
const openTokenModal = ref(false);

/**
 * COMPOSABLEs
 */
const { getToken } = useTokens();
const { fNum2 } = useNumbers();

/**
 * COMPUTED
 */
const hasToken = computed(() => !!props.modelValue);

const token = computed((): TokenInfo | null => {
  if (!hasToken.value) return null;
  return getToken(props.modelValue);
});

/**
 * METHODS
 */
function toggleModal(): void {
  if (!props.fixed) openTokenModal.value = !openTokenModal.value;
}

function tokenFor(option: string): TokenInfo {
  return getToken(option);
}
</script>

<template>
  <div>
    <div
      v-if="hasToken && options.length === 0"
      :class="['token-select-input selected group', { selectable: !fixed }]"
      @click="toggleModal"
    >
      <div class="w-8">
        <BalAsset :address="token?.address" class="shadow" />
      </div>
      <span class="text-xl font-bold">
        {{ token?.symbol }}
      </span>
      <span
        v-if="Number(weight) > 0"
        class="text-gray dark:text-gray-dark ml-2"
      >
        {{
          fNum2(weight, {
            style: 'percent',
            maximumFractionDigits: 0
          })
        }}
      </span>
      <BalIcon
        v-if="!fixed"
        name="chevron-down"
        size="sm"
        class="text-primary dark:text-primary-bright ml-2"
      />
    </div>

    <BalDropdown
      v-else-if="hasToken && fixed && options.length > 0"
      :options="options"
      minWidth="40"
      @selected="emit('update:modelValue', $event)"
    >
      <template #activator>
        <div class="token-select-input selected group selectable">
          <div class="w-8">
            <BalAsset :address="token?.address" class="shadow" />
          </div>
          <span class="text-xl font-bold">
            {{ token?.symbol }}
          </span>
          <span
            v-if="Number(weight) > 0"
            class="text-gray dark:text-gray-dark ml-2"
          >
            {{
              fNum2(weight, {
                style: 'percent',
                maximumFractionDigits: 0
              })
            }}
          </span>
          <BalIcon
            name="chevron-down"
            size="sm"
            class="text-primary dark:text-primary-bright ml-2"
          />
        </div>
      </template>
      <template #option="{ option: address }">
        <div
          :set="(optionToken = tokenFor(address) || {})"
          class="flex items-center justify-between"
        >
          <div class="flex items-center">
            <BalAsset :address="optionToken?.address" class="shadow" />
            <span class="ml-1 font-medium">
              {{ optionToken?.symbol }}
            </span>
          </div>
          <BalIcon
            v-if="optionToken.address === modelValue"
            name="check"
            class="text-primary dark:text-primary-bright ml-4"
          />
        </div>
      </template>
    </BalDropdown>

    <div
      v-else
      class="token-select-input unselected selectable"
      @click="toggleModal"
    >
      {{ $t('selectToken') }}
      <BalIcon
        name="chevron-down"
        size="sm"
        class="text-primary dark:text-primary-bright ml-2"
      />
    </div>

    <teleport to="#modal">
      <SelectTokenModal
        v-if="openTokenModal"
        :excludedTokens="[...excludedTokens, modelValue]"
        :includeEther="true"
        :disableInjection="disableInjection"
        @close="openTokenModal = false"
        @select="emit('update:modelValue', $event)"
      />
    </teleport>
  </div>
</template>

<style scoped>
.token-select-input {
  @apply rounded-lg flex items-center h-10 px-2 whitespace-nowrap;
  @apply text-sm;
}

.selectable {
  @apply cursor-pointer shadow-none;
}

.unselected {
  @apply bg-white4 dark:bg-white4-dark text-primary dark:text-primary-bright;
}

.selected {
  @apply bg-white4 dark:bg-white4-dark text-primary dark:text-primary-bright;
}
</style>
