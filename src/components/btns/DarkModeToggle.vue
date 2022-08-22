<script lang="ts" setup>
import useBreakpoints from '@/composables/useBreakpoints';
import useDarkMode from '@/composables/useDarkMode';

/**
 * COMPOSABLES
 */
const { isMobile } = useBreakpoints();
const { darkMode, toggleDarkMode } = useDarkMode();
</script>

<template>
  <BalBtn
    color="white3"
    :size="isMobile ? 'md' : 'sm'"
    :circle="isMobile"
    @click="toggleDarkMode"
    :style="{ width: '36px', height: '36px' }"
    class="theme-mode-toggle"
  >
    <SunIcon v-if="darkMode" />
    <MoonIcon v-else />
  </BalBtn>
</template>

<style scoped>
.theme-mode-toggle {
  padding: 8px;
}

.theme-mode-toggle:hover {
  @apply bg-white4 dark:bg-white4-dark;
}
</style>
