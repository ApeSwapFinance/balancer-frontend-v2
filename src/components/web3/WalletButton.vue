<template>
  <button class="wallet-connect-btn" @click="connectWallet(wallet)">
    <div class="flex items-center" style="width: 70%">
      <img
        :src="require(`@/assets/images/connectors/${wallet}.svg`)"
        class="h-10 w-10 mr-4"
      />
      <h5 class="text-primary dark:text-primary-bright text-base">
        <span class="capitalize">{{ WalletNameMap[wallet] }}</span>
      </h5>
    </div>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import useWeb3 from '@/services/web3/useWeb3';
import { Wallet, WalletNameMap } from '@/services/web3/web3.plugin';
export default defineComponent({
  props: {
    wallet: {
      type: String as PropType<Wallet>,
      required: true
    }
  },
  setup() {
    const { connectWallet } = useWeb3();
    return {
      WalletNameMap,
      connectWallet
    };
  }
});
</script>

<style>
.wallet-connect-btn {
  @apply transition-all;
  @apply bg-white2 dark:bg-white2-dark hover:bg-white3 dark:hover:bg-white3-dark;
  @apply border border-white4 dark:border-white4-dark hover:border-white3 dark:hover:border-white3-dark;
  @apply p-4 flex justify-start items-center w-full h-14 rounded-md mb-3 shadow-none;
}
</style>
