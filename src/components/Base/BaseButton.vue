<template>
  <component
    @click="$emit('click')"
    :is="link ? 'router-link' : 'button'"
    class="base-button"
    :class="styles"
    v-bind="$attrs"
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
    link: {
      type: Boolean,
      default: false,
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
          'inline-flex items-center justify-center': !this.icon && this.fab,
          'h-12 w-12': this.icon,
          'w-14 h-14 lg:w-auto lg:h-12 lg:p-4 fixed bottom-0 right-0 lg:static rounded-full lg:rounded mr-3 mb-3 lg:m-0':
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
  @apply font-bold text-center duration-200 rounded;
  @apply outline-none;
  &:focus {
    @apply outline-none;
  }
}
</style>
