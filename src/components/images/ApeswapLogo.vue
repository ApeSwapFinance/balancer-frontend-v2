<script lang="ts" setup>
import { computed } from 'vue';

import ApeswapLogoBlack from '@/components/images/ApeswapLogoBlack.vue';
import ApeswapLogoYellow from '@/components/images/ApeswapLogoYellow.vue';
import useDarkMode from '@/composables/useDarkMode';

/**
 * TYPES
 */
type Props = {
  forceDark: boolean;
};

/**
 * PROPS & EMITS
 */
const props = withDefaults(defineProps<Props>(), {
  forceDark: false
});

/**
 * COMPOSABLES
 */
const { darkMode } = useDarkMode();

/**
 * COMPUTED
 */
const useDarkLogo = computed(() => (props.forceDark ? true : darkMode.value));
</script>

<template>
  <ApeswapLogoYellow v-if="useDarkLogo" />
  <ApeswapLogoBlack v-else />
</template>
