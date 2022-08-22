<template>
  <div class="bal-toggle group" @click="onClick">
    <input
      type="checkbox"
      :name="name"
      :checked="modelValue"
      v-bind="$attrs"
      :disabled="disabled"
      class="bal-toggle-checkbox"
    />
    <label :for="name" class="bal-toggle-track" />
  </div>
  <label v-if="label" class="text-xs ml-2">
    {{ label }}
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'BalToggle',
  inheritAttrs: false,
  emits: ['update:modelValue', 'toggle'],
  props: {
    name: { type: String, required: true },
    modelValue: { type: Boolean, default: false },
    label: { type: String, default: '' },
    disabled: { type: Boolean, default: false },
    color: {
      type: String,
      default: 'success',
      validator: (val: string): boolean => ['success'].includes(val)
    }
  },
  setup(props, { emit }) {
    /**
     * METHODS
     */
    function onClick(event) {
      if (!props.disabled) {
        emit('update:modelValue', event.target.checked);
        emit('toggle', event.target.checked);
      }
    }
    return {
      // methods
      onClick
    };
  }
});
</script>

<style>
.bal-toggle {
  @apply relative inline-block w-10 align-middle select-none transition duration-200 ease-out;
}
.bal-toggle-checkbox {
  @apply absolute block w-6 h-6 rounded-full bg-ape-yellow border-4 border-ape-yellow appearance-none cursor-pointer transition-colors;
}
.bal-toggle-track {
  @apply block overflow-hidden h-6 rounded-full bg-white4 dark:bg-white4-dark bg-none cursor-pointer transition-colors;
}
.bal-toggle-checkbox:checked {
  @apply right-0 bg-success border-4 border-success transition-colors;
}

.bal-toggle-track[for='tradeGasless'] {
  @apply h-8;
}
.bal-toggle-checkbox[name='tradeGasless'] {
  @apply w-8 h-8 flex items-center justify-center;
}
.bal-toggle-checkbox[name='tradeGasless']:before {
  content: '⛽';
}
.bal-toggle-checkbox[name='tradeGasless']:checked:before {
  content: '✍️';
}

.bal-toggle-checkbox:checked + .bal-toggle-track {
  @apply bg-hovered-ape-yellow;
}
.bal-toggle-checkbox[disabled] {
  @apply cursor-not-allowed;
}
.bal-toggle-checkbox[disabled] + .bal-toggle-track {
  @apply cursor-not-allowed;
}
</style>
