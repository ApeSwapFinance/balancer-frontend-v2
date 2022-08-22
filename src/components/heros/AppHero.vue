<script lang="ts" setup>
import { computed } from 'vue';

import usePools from '@/composables/pools/usePools';
import useStaking from '@/composables/staking/useStaking';
import useFathom from '@/composables/useFathom';
import { useLock } from '@/composables/useLock';
import { isL2 } from '@/composables/useNetwork';
import useNumbers, { FNumFormats } from '@/composables/useNumbers';
import { EXTERNAL_LINKS } from '@/constants/links';
import { bnum } from '@/lib/utils';
import useWeb3 from '@/services/web3/useWeb3';

/**
 * COMPOSABLES
 */
const { fNum2 } = useNumbers();
const {
  isWalletReady,
  toggleWalletSelectModal,
  isWalletConnecting
} = useWeb3();
const { trackGoal, Goals } = useFathom();
const { totalInvestedAmount, isLoadingUserPools } = usePools();
const { lockFiatValue, isLoadingLock } = useLock();
const {
  userData: {
    totalStakedFiatValue,
    isLoadingUserStakingData,
    isLoadingStakedPools,
    isUserStakeDataIdle
  }
} = useStaking();

/**
 * COMPUTED
 */
const classes = computed(() => ({
  ['h-72']: !isWalletReady.value && !isWalletConnecting.value,
  ['h-40']: isWalletReady.value || isWalletConnecting.value
}));

const isStakingLoading = computed(() => {
  return (
    isLoadingStakedPools.value ||
    isLoadingUserStakingData.value ||
    isUserStakeDataIdle.value
  );
});

const totalInvestedLabel = computed((): string => {
  const value = bnum(totalInvestedAmount.value || '0')
    .plus(lockFiatValue.value)
    .plus(totalStakedFiatValue.value)
    .toString();
  return fNum2(value, FNumFormats.fiat);
});

const isLoadingLockAndStaking = computed(
  (): boolean => (!isL2.value && isLoadingLock.value) || isStakingLoading.value
);

const isLoadingTotalValue = computed(
  (): boolean => isLoadingUserPools.value || isLoadingLockAndStaking.value
);

/**
 * METHODS
 */
function onClickConnect() {
  toggleWalletSelectModal(true);
  trackGoal(Goals.ClickHeroConnectWallet);
}
</script>

<template>
  <div :class="['app-hero', classes]">
    <div class="w-full max-w-2xl mx-auto">
      <template v-if="isWalletReady || isWalletConnecting">
        <h1
          v-text="$t('myBalancerInvestments')"
          class="text-base font-medium text-primary dark:text-primary-bright opacity-90 font-body mb-2"
        />
        <BalLoadingBlock
          v-if="isLoadingTotalValue"
          class="h-10 w-40 mx-auto text-primary"
        />
        <div
          v-else
          class="text-3xl font-bold text-primary dark:text-primary-bright mb-1"
        >
          {{ totalInvestedLabel }}
        </div>
        <div v-if="!isL2" class="relative mt-2 inline-block">
          <BalLoadingBlock
            v-if="isLoadingTotalValue"
            class="h-8 w-40 mx-auto"
            white
          />
        </div>
      </template>
      <template v-else>
        <h1 v-text="$t('ammPlatform')" class="headline" />
        <div class="flex justify-center mt-4">
          <BalBtn
            class="mr-3 bg-ape-yellow hover:bg-hovered-ape-yellow"
            @click="onClickConnect"
          >
            {{ $t('connectWallet') }}
          </BalBtn>
          <BalBtn
            tag="a"
            :href="EXTERNAL_LINKS.Balancer.Home"
            target="_blank"
            rel="noreferrer"
            outline
            class="learn-more"
            @click="trackGoal(Goals.ClickHeroLearnMore)"
          >
            {{ $t('learnMore') }}
            <BalIcon name="arrow-up-right" size="sm" class="ml-1" />
          </BalBtn>
        </div>
      </template>
    </div>
  </div>
</template>

<style>
.app-hero {
  @apply bg-cover bg-center bg-white3 dark:bg-white3-dark flex items-center justify-center text-center px-4;
}
.headline {
  @apply text-primary dark:text-primary-bright text-center text-4xl md:text-5xl pb-2 font-display font-bold;
}
.learn-more {
  @apply text-primary dark:text-primary-bright bg-transparent border-primary dark:border-primary-bright border-2;
}
</style>
