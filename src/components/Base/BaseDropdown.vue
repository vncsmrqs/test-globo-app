<script>
export default {
  props: {
    closeKey: {
      type: String,
      default: 'Escape',
    },
    wrapperClass: {
      type: [String, Object, Array],
      default: '',
    },
    ignoreClickElement: {
      default: null,
    },
  },
  data: () => ({
    showContent: false,
  }),
  computed: {
    ignoreClick() {
      if (typeof this.ignoreClickElement === 'string') {
        return document.querySelectorAll(this.ignoreClickElement);
      }
      return this.ignoreClickElement;
    },
  },
  watch: {
    showContent(v) {
      this.handleShow(v);
    },
  },
  methods: {
    handleClose() {
      this.$emit('close');
    },
    handleShow(value) {
      if (value) {
        return this.registerEvents();
      }
      this.removeEvents();
    },
    handleKeyUp(event) {
      if (event.key === this.closeKey) {
        event.stopImmediatePropagation();
        this.handleClose();
      }
    },
    handleClick({ path }) {
      if (path.includes(this.$el)) return;
      if (path.includes(this.ignoreClick)) return;
      this.handleClose();
    },
    registerEvents() {
      document.addEventListener('mousedown', this.handleClick, true);
      document.addEventListener('keyup', this.handleKeyUp);
    },
    removeEvents() {
      document.removeEventListener('mousedown', this.handleClick, true);
      document.removeEventListener('keyup', this.handleKeyUp);
    },
  },
  mounted() {
    this.showContent = true;
  },
  beforeDestroy() {
    this.showContent = false;
    this.removeEvents();
  },
};
</script>

<template>
  <transition name="base-dropdown__fade">
    <div v-show="showContent" class="base-dropdown">
      <slot></slot>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.base-dropdown {
  top: 100%;
  right: 0;
  position: absolute;
  z-index: 10;

  &__fade {
    &-enter-active,
    &-leave-active {
      transition: opacity 0.2s;
    }
    &-enter,
    &-leave-to {
      opacity: 0;
    }
  }
}
</style>
