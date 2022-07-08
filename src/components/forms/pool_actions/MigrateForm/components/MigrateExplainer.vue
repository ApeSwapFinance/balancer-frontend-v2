<script setup lang="ts">
import { PoolMigrationInfo } from '@/components/forms/pool_actions/MigrateForm/types';

type Props = {
  poolMigrationInfo: PoolMigrationInfo;
};

/**
 * PROPS
 */
defineProps<Props>();
</script>

<template>
  <BalCard noPad shadow="none">
    <div class="p-4 w-full border-b border-white4 dark:border-white4-dark">
      <h6>
        {{ $t(`migratePool.${poolMigrationInfo.type}.whyMigrate.title`) }}
      </h6>
    </div>
    <div class="-mt-2 p-4">
      <div class="text-gray dark:text-gray-dark">
        {{ $t(`migratePool.${poolMigrationInfo.type}.whyMigrate.description`) }}
      </div>
    </div>
  </BalCard>
</template>
