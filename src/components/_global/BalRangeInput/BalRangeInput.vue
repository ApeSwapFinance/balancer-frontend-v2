<template>
  <div class="pr-2">
    <div class="flex justify-between text-sm text-gray">
      <div>
        <slot v-if="$slots.leftLabel || leftLabel" name="leftLabel">
          {{ leftLabel }}
        </slot>
      </div>
      <div>
        <slot v-if="$slots.rightLabel || rightLabel" name="rightLabel">
          {{ rightLabel }}
        </slot>
      </div>
    </div>
    <vue-slider
      v-model="range"
      v-bind="$attrs"
      @change="onChange"
      @drag-end="onDragEnd"
      :dot-style="dotStyle"
      :rail-style="railSyle"
      :process-style="proccessStyle"
    />
  </div>
</template>

<script>
import 'vue-slider-component/theme/antd.css';

import { computed, defineComponent, ref, watch } from 'vue';
import VueSlider from 'vue-slider-component';

import { theme } from '@/../tailwind.config';
import useDarkMode from '@/composables/useDarkMode';

export default defineComponent({
  name: 'BalRangeInput',

  components: {
    VueSlider
  },

  emits: ['change', 'update:modelValue', 'dragEnd'],

  props: {
    modelValue: { type: [String, Number], default: '0' },
    leftLabel: { type: String, default: '' },
    rightLabel: { type: String, default: '' }
  },

  setup(props, { emit }) {
    const range = ref(0);
    const { darkMode } = useDarkMode();

    const colors = theme.extend.colors;

    function onChange(value) {
      emit('change', value);
      emit('update:modelValue', value);
    }

    function onDragEnd() {
      emit('dragEnd', props.modelValue);
    }

    const dotStyle = computed(() => {
      return {
        backgroundColor: colors['ape-yellow'],
        borderColor: colors['ape-yellow'],
        borderWidth: 0,
        backgroundImage: `linear-gradient(to top right, ${colors['ape-yellow']}, ${colors['ape-yellow']})`
      };
    });

    const railSyle = computed(() => {
      return {
        background: darkMode.value ? colors['white4-dark'] : colors.white4
      };
    });

    const proccessStyle = computed(() => {
      return {
        backgroundImage: `linear-gradient(to top right, ${colors['ape-yellow']}, ${colors['ape-yellow']})`
      };
    });

    watch(
      () => props.modelValue,
      newVal => {
        range.value = Number(newVal) || 0;
      },
      { immediate: true }
    );

    return {
      range,
      onChange,
      onDragEnd,
      dotStyle,
      railSyle,
      proccessStyle
    };
  }
});
</script>

<style>
.vue-slider-dot-handle-focus {
  box-shadow: 0 0 0 5px rgb(0, 0, 0, 0.2);
}
</style>
