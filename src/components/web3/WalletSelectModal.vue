<template>
  <BalModal
    :show="isVisible"
    @close="$emit('close')"
    title="Connect to a wallet"
  >
    <p class="pb-3 text-sm">
      {{ $t('byConnectingWallet') }}
      <router-link :to="{ name: 'terms-of-use' }" target="_blank">
        <span className="link yellow">{{ $t('policies.termsOfUse') }}</span
        >,
      </router-link>
      <router-link :to="{ name: 'cookies-policy' }" target="_blank">
        <span className="link yellow">{{ $t('policies.cookiesPolicy') }}</span>
      </router-link>
      {{ $t('and') }}
      <router-link :to="{ name: 'privacy-policy' }" target="_blank">
        <span className="link yellow">{{ $t('policies.privacyPolicy') }}</span
        >.
      </router-link>
    </p>
    <WalletButton v-for="wallet in wallets" :wallet="wallet" :key="wallet" />
    <div
      class="
        p-4
        rounded-lg
        bg-white3
        dark:bg-white3-dark
      "
    >
      <h6>{{ $t('newToEthereum') }}</h6>
      <p class="text-sm">
        {{ $t('setUpEthereumWallet') }}
        <BalLink
          :href="EXTERNAL_LINKS.Ethereum.Wallets"
          class="yellow"
          external
        >
          {{ $t('learnMore') }}
          <span class="align-middle"
            ><BalIcon name="arrow-up-right" size="sm" class="text-ape-yellow"
          /></span>
        </BalLink>
      </p>
    </div>
  </BalModal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import WalletButton from '@/components/web3/WalletButton.vue';
import { EXTERNAL_LINKS } from '@/constants/links';
import { SupportedWallets } from '@/services/web3/web3.plugin';
export default defineComponent({
  emits: ['close'],
  components: {
    WalletButton
  },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {
      wallets: SupportedWallets.filter(id => id !== 'gnosis'),
      EXTERNAL_LINKS
    };
  }
});
</script>
