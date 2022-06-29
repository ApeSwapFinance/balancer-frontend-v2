<script lang="ts" setup>
import { computed } from 'vue';

type Props = {
  active: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  active: false
});

const classes = computed(() => ({
  'border-none': !props.active,
  'border-primary dark:border-primary-bright': props.active
}));
</script>

<template>
  <router-link :class="['desktop-link-item', classes]">
    <slot />
  </router-link>
</template>

<style scoped>
.desktop-link-item {
  @apply transition ease-in-out duration-500;
  @apply border-b-2 hover:border-primary;
  @apply h-full flex flex-col justify-center;
  @apply cursor-pointer hover:text-primary;
}
</style>
