<template>
  <div class="base-input">
    <label
      v-if="label"
      id=""
      v-text="label"
      class="mb-2 text-sm text-gray-500"
    ></label>
    <div class="base-input__wrapper" :class="styles">
      <slot name="prepend" />
      <input v-model="localValue" v-bind="$attrs" />
      <slot name="append" />
    </div>
    <div v-if="$slots.validation" class="">
      <slot name="validation"></slot>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  name: 'BaseInput',
  props: {
    value: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    hasErrors: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    localValue: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
    styles() {
      return [
        {
          'border-primary ring-primary-light': !this.hasErrors,
          'border-danger ring-danger-light': this.hasErrors,
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.base-input {
  &__wrapper {
    @apply border bg-white;
    @apply relative rounded duration-300 w-full overflow-hidden flex items-center;

    &:focus-within {
      @apply ring;
    }

    input {
      @apply w-full bg-transparent h-12 px-4 py-2;

      &:focus {
        @apply outline-none;
      }
    }
  }
}
</style>
