<script setup lang="ts">
import { computed, ref } from 'vue';

/**
 * TYPES
 */
type Props = {
  options: Array<any>;
  minWidth?: string;
};

/**
 * PROPS & EMITS
 */
const props = withDefaults(defineProps<Props>(), {
  minWidth: 'auto'
});

const emit = defineEmits<{
  (e: 'selected', value: any): void;
}>();

/**
 * STATE
 */
const showDropdown = ref(false);

/**
 * COMPUTED
 */
const dropdownClasses = computed(() => ({
  [`min-w-${props.minWidth}`]: true
}));

/**
 * METHODS
 */
function toggleDropdown(): void {
  showDropdown.value = !showDropdown.value;
}

function hideDropdown(): void {
  showDropdown.value = false;
}

function handleRowClick(option: any): void {
  emit('selected', option);
  hideDropdown();
}
</script>

<template>
  <div class="relative" v-click-outside="hideDropdown">
    <div class="activator" @click="toggleDropdown">
      <slot name="activator" />
    </div>
    <div :class="['bal-dropdown', dropdownClasses]" v-if="showDropdown">
      <div
        v-for="(option, i) in options"
        :key="i"
        class="bal-dropdown-row"
        @click="handleRowClick(option)"
      >
        <slot name="option" :option="option" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.bal-dropdown {
  @apply absolute shadow rounded-lg z-10;
  @apply bg-white dark:bg-white3-dark;
  @apply border dark:border-white1-dark divide-y dark:divide-white1-dark;
}

.bal-dropdown-row {
  @apply p-3 whitespace-nowrap hover:bg-primary-bright dark:hover:bg-white1-dark cursor-pointer;
  @apply first:rounded-t-lg last:rounded-b-lg;
}
</style>
