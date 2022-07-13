<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import ApeswapLogo from '@/components/images/ApeswapLogo.vue';
import useDarkMode from '@/composables/useDarkMode';
import { sleep } from '@/lib/utils';
import useWeb3 from '@/services/web3/useWeb3';

/**
 * PROPS & EMITS
 */
const emit = defineEmits(['close']);

/**
 * COMPOSABLES
 */
const { darkMode, toggleDarkMode } = useDarkMode();
const { blockNumber } = useWeb3();
const { t } = useI18n();
const router = useRouter();

/**
 * STATE
 */
const blockIcon = ref<HTMLDivElement>();

const navLinks = [
  { label: t('invest'), path: '/' },
  { label: t('trade'), path: '/trade' }
];

const ecosystemLinks = [
  { label: t('build'), url: 'https://balancer.fi/build' },
  { label: t('blog'), url: 'https://medium.com/balancer-protocol' },
  { label: t('docs'), url: 'https://docs.balancer.fi/' }
];

/**
 * METHODS
 */
async function navTo(path: string) {
  router.push(path);
  emit('close');
}

/**
 * WATCHERS
 */
watch(blockNumber, async () => {
  blockIcon.value?.classList.add('block-change');
  await sleep(300);
  blockIcon.value?.classList.remove('block-change');
});
</script>

<template>
  <div class="opacity-0 fade-in-delay">
    <div
      class="h-20 px-4 border-b border-white4 dark:border-white4-dark flex flex-col justify-center"
    >
      <ApeswapLogo />
    </div>

    <div class="grid grid-col-1 text-lg mt-2">
      <div
        v-for="link in navLinks"
        :key="link.label"
        class="side-bar-link"
        @click="navTo(link.path)"
      >
        {{ link.label }}
      </div>
    </div>

    <div class="grid grid-col-1 text-sm mt-5">
      <span class="text-gray dark:text-gray-dark px-4 pb-1 font-medium"
        >Ecosystem</span
      >
      <BalLink
        v-for="link in ecosystemLinks"
        :key="link.url"
        :href="link.url"
        class="side-bar-link flex items-center"
        external
        noStyle
      >
        {{ link.label }}
        <BalIcon
          name="arrow-up-right"
          size="sm"
          class="ml-1 text-gray dark:text-gray-dark"
        />
      </BalLink>
    </div>

    <div class="side-bar-btn mt-6" @click="toggleDarkMode">
      <MoonIcon v-if="!darkMode" class="mr-2" />
      <SunIcon v-else class="mr-2" />
      <span>{{ darkMode ? 'Light' : 'Dark' }} mode</span>
    </div>
  </div>
</template>

<style scoped>
.side-bar-link {
  @apply transition duration-300 p-4 py-1.5 cursor-pointer;
  @apply hover:bg-white3 dark:hover:bg-white3-dark;
}

.side-bar-btn {
  @apply flex items-center bg-white3 dark:bg-white3-dark hover:bg-white3 dark:hover:bg-white3-dark rounded-lg p-2 mx-3 cursor-pointer transition;
}

.social-link {
  @apply w-11 h-11 xs:w-12 xs:h-12 rounded-full bg-white1-dark hover:bg-white3-dark flex items-center justify-center text-primary-bright cursor-pointer;
}

.social-link > svg {
  @apply w-6 h-6;
  fill: white;
}

.block-icon {
  box-shadow: 0px 0px 3px 2px theme('colors.success');
  transition: box-shadow 0.3s ease-in-out;
}

.block-change {
  box-shadow: 0px 0px 6px 4px theme('colors.success');
}
</style>
