<script lang="ts" setup>
import { computed } from 'vue';

import useDarkMode from '@/composables/useDarkMode';

/**
 * TYPES
 */
type RoundedOpts = 'sm' | 'md' | 'lg';

type Props = {
  white?: boolean;
  darker?: boolean;
  square?: boolean;
  rounded?: RoundedOpts;
};

/**
 * PROPS & EMITS
 */
const props = withDefaults(defineProps<Props>(), {
  white: false,
  darker: false,
  square: false,
  rounded: 'lg'
});

/**
 * COMPOSABLES
 */
const { darkMode } = useDarkMode();

/**
 * COMPUTED
 */
const bgClass = computed(() => {
  if (props.white) return 'shimmer-white';
  if (darkMode.value) {
    return props.darker ? 'shimmer-dark-mode-darker' : 'shimmer-dark-mode';
  }
  return props.darker ? 'shimmer-light-mode-darker' : 'shimmer-light-mode';
});

const classes = computed(() => {
  return {
    [`rounded-${props.rounded}`]: !props.square,
    [bgClass.value]: true
  };
});
</script>

<template>
  <div :class="['bal-loading-block', classes]" />
</template>

<style>
.bal-loading-block {
  min-height: 5px;
}

@keyframes shimmerBackground {
  0% {
    background-position: -5000px 0;
  }
  100% {
    background-position: 5000px 0;
  }
}

.shimmer-white {
  --startColor: rgba(255, 255, 255, 0.1);
  --midColor: rgba(255, 255, 255, 0.2);
  --endColor: rgba(255, 255, 255, 0.1);

  animation: shimmerBackground 10s infinite;
  background: linear-gradient(
    to right,
    var(--startColor) 4%,
    var(--midColor) 25%,
    var(--endColor) 36%
  );
  background-size: 1000px 100%;
}

.shimmer-light-mode {
  --startColor: theme('colors.primary-bright');
  --midColor: theme('colors.primary-bright');
  --endColor: theme('colors.primary-bright');

  animation: shimmerBackground 10s infinite;
  background: linear-gradient(
    to right,
    var(--startColor) 4%,
    var(--midColor) 25%,
    var(--endColor) 36%
  );
  background-size: 1000px 100%;
}

.shimmer-light-mode-darker {
  --startColor: theme('colors.primary-bright');
  --midColor: theme('colors.primary-bright');
  --endColor: theme('colors.primary-bright');

  animation: shimmerBackground 10s infinite;
  background: linear-gradient(
    to right,
    var(--startColor) 4%,
    var(--midColor) 25%,
    var(--endColor) 36%
  );
  background-size: 1000px 100%;
}

.shimmer-dark-mode {
  --startColor: theme('colors.white1-dark');
  --midColor: theme('colors.white3-dark');
  --endColor: theme('colors.white1-dark');

  animation: shimmerBackground 10s infinite;
  background: linear-gradient(
    to right,
    var(--startColor) 4%,
    var(--midColor) 25%,
    var(--endColor) 36%
  );
  background-size: 1000px 100%;
}

.shimmer-dark-mode-darker {
  --startColor: theme('colors.gray-dark');
  --midColor: theme('colors.gray-dark');
  --endColor: theme('colors.gray-dark');

  animation: shimmerBackground 10s infinite;
  background: linear-gradient(
    to right,
    var(--startColor) 4%,
    var(--midColor) 25%,
    var(--endColor) 36%
  );
  background-size: 1000px 100%;
}
</style>
