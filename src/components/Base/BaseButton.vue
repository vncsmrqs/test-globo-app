<template>
  <component
    @click="$emit('click')"
    :is="to ? 'router-link' : 'button'"
    class="base-button rounded"
    :class="styles"
    v-bind="$attrs"
    :to="to"
    :disabled="false"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'BaseButton',
  inheritAttrs: false,
  props: {
    to: {
      type: [Object, String],
      default: '',
    },
    ring: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Boolean,
      default: false,
    },
    fab: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    styles() {
      return [
        {
          'h-12 px-4 inline-flex items-center': !this.icon && !this.fab,
          'inline-flex items-center justify-center': this.icon || this.fab,
          'h-12 w-12': this.icon && !this.fab,
          'shadow-lg w-14 h-14 lg:w-auto lg:h-12 lg:p-4 fixed bottom-0 right-0 lg:static rounded-full lg:rounded mr-8 mb-4 lg:m-0':
            this.fab,
          'focus:ring-4 ring-primary-light': this.ring,
          'border border-primary': this.border,
        },
      ];
    },
  },
};
</script>

<style lang="scss">
.base-button {
  @apply font-bold text-center duration-200;
  @apply outline-none;
  &:focus {
    @apply outline-none;
  }
}
</style>
