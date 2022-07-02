<script lang="ts" setup>
import { computed } from 'vue';

import DarkModeToggle from '@/components/btns/DarkModeToggle.vue';
import useBreakpoints from '@/composables/useBreakpoints';
import { useSidebar } from '@/composables/useSidebar';
import useWeb3 from '@/services/web3/useWeb3';

import AppNavAccountBtn from './AppNavAccountBtn.vue';
import AppNavActivityBtn from './AppNavActivityBtn/AppNavActivityBtn.vue';
import AppNavNetworkSelect from './AppNavNetworkSelect.vue';

/**
 * COMPOSABLES
 */
const { isMobile, isDesktop } = useBreakpoints();
const { account, connector, toggleWalletSelectModal } = useWeb3();
const { setSidebarOpen } = useSidebar();

/**
 * COMPUTED
 */
const hideNetworkSelect = computed(() => connector.value?.id === 'gnosis');
</script>

<template>
  <div class="grid gap-4 grid-rows-1 grid-flow-col">
    <DarkModeToggle v-if="isDesktop" />
    <AppNavActivityBtn v-if="account" />
    <AppNavAccountBtn v-if="account" />
    <BalBtn
      v-else
      class="connect-wallet-btn"
      color="white3"
      :size="isMobile ? 'md' : 'sm'"
      @click="toggleWalletSelectModal"
    >
      <WalletIcon class="mr-2" />
      <span
        class="hidden lg:inline-block capitalize"
        v-text="$t('connectWallet')"
      />
      <span class="lg:hidden" v-text="$t('connect')" />
    </BalBtn>
    <AppNavNetworkSelect v-if="!hideNetworkSelect" />
    <BalBtn
      v-if="isMobile"
      color="primary"
      class="menu-btn"
      @click="setSidebarOpen(true)"
      transparent
    >
      <BalIcon
        name="menu"
        size="lg"
        class="text-primary dark:text-primary-bright"
      />
    </BalBtn>
  </div>
</template>

<style scoped>
.connect-wallet-btn {
  @apply text-primary dark:text-primary-bright font-medium text-xs;
}
.connect-wallet-btn:hover {
  @apply bg-white4 dark:bg-white4-dark;
}
.menu-btn {
  @apply p-2;
}
</style>
