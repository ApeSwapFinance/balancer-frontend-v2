<script lang="ts" setup>
import { computed } from 'vue';

import useDarkMode from '@/composables/useDarkMode';
import useTailwind from '@/composables/useTailwind';

const { theme } = useTailwind();
const { darkMode } = useDarkMode();

const color = computed(() =>
  darkMode.value ? theme.colors['primary-bright'] : theme.colors.primary
);
</script>

<template>
  <svg
    width="27"
    height="24"
    viewBox="0 0 27 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M25.0863 12H20.4196L16.9196 22.5L9.91959 1.5L6.41959 12H1.75293"
      :stroke="color"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
