<template>
  <component
    :is="tag"
    v-bind="$attrs"
    class="base-card block rounded-2xl"
    :class="styles"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'BaseCard',
  inheritAttrs: false,
  props: {
    shadow: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: [Array, String],
      default: 'white',
    },
    tag: {
      type: String,
      default: 'div',
    },
    ring: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    themeClasses() {
      switch (this.theme) {
        case 'primary': {
          return ['bg-lightBlue-200', 'text-gray-600'];
        }
        case 'danger': {
          return ['bg-danger-light', 'text-danger'];
        }
        case 'success': {
          return ['bg-success-light', 'text-success'];
        }
        default: {
          return ['bg-white', 'text-gray-600'];
        }
      }
    },
    styles() {
      return [
        ...this.themeClasses,
        { 'shadow-1': this.shadow },
        { 'focus:ring focus:outline-none': this.ring },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
.base-card {
}
</style>
