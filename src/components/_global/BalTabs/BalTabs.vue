<template>
  <div>
    <div :class="['bal-tab-container', containerClasses]">
      <div
        v-for="(tab, i) in tabs"
        :key="i"
        :class="['bal-tab', stateClasses(tab)]"
        @click="onClick(tab)"
      >
        {{ tab.label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';

interface Tab {
  value: string;
  label: string;
}

export default defineComponent({
  name: 'BalTabs',

  emits: ['selected', 'update:modelValue'],

  props: {
    tabs: { type: Array as PropType<Tab[]>, required: true },
    modelValue: { type: String, default: '' },
    noPad: { type: Boolean, default: false }
  },

  setup(props, { emit }) {
    const activeTab = ref(props.modelValue);

    function isActiveTab(tab: Tab): boolean {
      return activeTab.value === tab.value;
    }

    function onClick(tab: Tab) {
      activeTab.value = tab.value;
      emit('selected', tab.value);
      emit('update:modelValue', tab.value);
    }

    const containerClasses = computed(() => {
      return {
        'px-4': !props.noPad
      };
    });

    function stateClasses(tab: Tab): Record<string, boolean> {
      return {
        'border-ape-yellow text-ape-yellow': isActiveTab(tab),
        'text-gray dark:text-gray-dark hover:text-ape-yellow dark:hover:text-ape-yellow border-none transition-colors': !isActiveTab(
          tab
        )
      };
    }

    return {
      activeTab,
      onClick,
      containerClasses,
      stateClasses
    };
  }
});
</script>

<style>
.bal-tab {
  @apply border-b -mb-px mr-6 py-3 cursor-pointer;
}

.bal-tab-container {
  @apply flex border-b font-medium text-gray dark:border-white1-dark;
}
</style>
