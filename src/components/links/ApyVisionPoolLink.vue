<script lang="ts" setup>
import {
  TitleTokens,
  useApyVisionHelpers
} from '@/composables/external/useApyVisionHelpers';
import { getAddressFromPoolId } from '@/lib/utils';

/**
 * TYPES
 */
type Props = {
  poolId: string;
  titleTokens: TitleTokens;
};

/**
 * PROPS & EMITS
 */
defineProps<Props>();

/**
 * COMPOSABLES
 */
const { poolPathSymbolSegment, apyVisionNetworkName } = useApyVisionHelpers();
</script>

<template>
  <div class="mt-6 w-fit h-fit flex items-center group">
    <BalLink
      :href="
        'https://app.apy.vision/pools/balancerv2_' +
          apyVisionNetworkName +
          '-' +
          poolPathSymbolSegment(titleTokens) +
          '-' +
          getAddressFromPoolId(poolId)
      "
      external
      class="flex items-center font-medium link text-primary dark:hover:text-primary-bright"
    >
      <img
        width="32"
        height="32"
        class="mr-2 rounded-full transition"
        src="@/assets/images/icons/apy-vision.svg"
        alt=""
      />
      {{ $t('apyvisionPoolInsights') }}
      <BalIcon
        name="arrow-up-right"
        size="sm"
        class="ml-0.5 text-gray dark:text-gray-dark transition-colors"
      />
    </BalLink>
  </div>
</template>
