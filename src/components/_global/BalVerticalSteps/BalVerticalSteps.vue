<script lang="ts" setup>
import { computed } from 'vue';

import { getActiveClassName } from '@/components/utils';
import { StepState } from '@/types';

type Props = {
  title: string;
  steps: Step[];
};

type Step = {
  tooltip: string;
  state: StepState;
  label: number;
  isVisible?: boolean;
};

const props = defineProps<Props>();
const emit = defineEmits(['navigate']);

/**
 * COMPUTED
 */
const visibleSteps = computed(() => {
  return props.steps.filter(
    step => step.isVisible === undefined || step.isVisible
  );
});

const stepTextClasses = computed(() => {
  return visibleSteps.value.map(step => {
    return getActiveClassName(step.state, [
      [StepState.Active, 'font-bold'],
      [StepState.Todo, 'text-gray dark:text-gray-dark font-medium'],
      [StepState.Success, 'text-success font-bold'],
      [StepState.Warning, 'text-error font-bold'],
      [
        StepState.Completed,
        'text-ape-yellow dark:border-ape-yellow font-medium'
      ]
    ]);
  });
});

const stepCircleClasses = computed(() => {
  return visibleSteps.value.map(step => {
    return getActiveClassName(step.state, [
      [
        StepState.Active,
        'border-2 border-ape-yellow dark:border-ape-yellow text-ape-yellow active'
      ],
      [
        StepState.Todo,
        'border-2 border-white4 dark:border-white4-dark text-white4'
      ],
      [StepState.Success, 'border-2 border-success text-success'],
      [StepState.Warning, 'border-2 border-error text-error active'],
      [
        StepState.Completed,
        'border-2 border-ape-yellow dark:border-ape-yellow text-ape-yellow font-medium'
      ]
    ]);
  });
});

/**
 * FUNCTIONS
 */
function handleNavigate(state: StepState, stepIndex: number) {
  if (state === StepState.Todo) return;
  emit('navigate', stepIndex);
}
</script>

<template>
  <BalCard noPad shadow="none">
    <div class="p-4 border-b border-white4 dark:border-white4-dark">
      <h6>{{ title }}</h6>
    </div>
    <BalStack vertical spacing="base" class="p-4" justify="center">
      <div
        v-for="(step, i) in visibleSteps"
        :key="`vertical-step-${step.tooltip}`"
        class="flex items-center"
      >
        <button
          @click="handleNavigate(step.state, i)"
          :class="{ 'cursor-default': step.state === StepState.Todo }"
        >
          <BalStack horizontal align="center" spacing="sm">
            <div
              :class="[
                'relative text-sm rounded-full w-7 h-7 flex justify-center items-center',
                stepCircleClasses[i],
                { 'circle-line': i !== visibleSteps.length - 1 }
              ]"
            >
              <div
                class="absolute top-0 left-0 right-0 bottom-0 w-4 mx-auto flex justify-center items-center"
              >
                <span
                  v-if="
                    ![StepState.Warning, StepState.Error].includes(step.state)
                  "
                  >{{ step.label || i + 1 }}</span
                >
                <span class="font-bold" v-else>!</span>
              </div>
            </div>
            <span :class="['text-sm', stepTextClasses[i]]">
              {{ step.tooltip }}
            </span>
          </BalStack>
        </button>
      </div>
    </BalStack>
  </BalCard>
</template>

<style scoped>
.circle-line::after {
  @apply absolute left-0 right-0 my-0 mx-auto bg-white4 dark:bg-white4-dark w-px;
  content: '';
  bottom: -1.125rem;
  height: 1rem;
}

.circle-line.active::after {
  bottom: -1rem;
  height: 1rem;
}
</style>
