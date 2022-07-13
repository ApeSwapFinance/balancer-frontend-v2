<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import AppHero from '@/components/heros/AppHero.vue';
import AppNav from '@/components/navs/AppNav/AppNav.vue';
import StakingProvider from '@/providers/local/staking/staking.provider';

/**
 * COMPOSABLES
 */
const route = useRoute();

/**
 * COMPUTED
 */
const isHomePage = computed(() => route.path === '/');
</script>

<template>
  <div class="body-con">
    <AppNav />
    <template v-if="isHomePage">
      <StakingProvider>
        <AppHero />
      </StakingProvider>
    </template>
    <div class="pb-16">
      <router-view :key="$route.path" />
    </div>
  </div>
</template>

<style>
.VueQueryDevtoolsPanel + button {
  @apply text-primary bg-primary-bright p-2 rounded text-sm;
}

.body-con {
  @apply bg-white1 dark:bg-white1-dark;
  height: 100%;
}
</style>
