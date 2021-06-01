<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    closeKey: {
      type: String,
      default: 'Escape',
    },
    wrapperClass: {
      type: [String, Object, Array],
      default: '',
    },
    backdropClass: {
      type: [String, Object, Array],
      default: '',
    },
    contentClass: {
      type: [String, Object, Array],
      default: '',
    },
  },
  data: () => ({
    showContent: false,
  }),
  watch: {
    show(v) {
      this.handleShow(v);
    },
  },
  mounted() {
    document.body.append(this.$el);
    if (this.show) {
      setTimeout(() => {
        this.handleShow(true);
      }, 100);
    }
  },
  methods: {
    handleClose() {
      this.$emit('close');
    },
    handleKeyUp(event) {
      if (event.key === this.closeKey && this.showContent) {
        event.stopImmediatePropagation();
        this.handleClose();
      }
    },
    registerEvents() {
      if (this.closeKey) {
        document.addEventListener('keyup', this.handleKeyUp, true);
      }
    },
    removeEvents() {
      document.removeEventListener('keyup', this.handleKeyUp, true);
    },
    handleShow(value) {
      if (value) {
        this.$nextTick(() => {
          this.showContent = true;
        });
        document.body.classList.add('overflow-hidden');
        return this.registerEvents();
      }
      this.showContent = false;
      document.body.classList.remove('overflow-hidden');
      this.removeEvents();
    },
  },
  beforeDestroy() {
    this.removeEvents();
    this.$el.parentElement.removeChild(this.$el);
  },
};
</script>

<template>
  <transition name="fade">
    <div v-show="show" class="base-modal backdrop-filter">
      <div
        class="base-modal__wrapper justify-center items-center"
        :class="wrapperClass"
      >
        <div
          class="base-modal__backdrop bg-gray-400"
          @click="handleClose"
          :class="backdropClass"
        ></div>
        <transition name="in">
          <div
            v-show="showContent"
            class="base-modal__content"
            :class="contentClass"
          >
            <slot></slot>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.base-modal {
  width: 100%;
  position: fixed;
  height: 100%;
  backdrop-filter: blur(4px);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 50;

  &__wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
  }

  &__backdrop {
    position: relative;
    width: 100%;
    height: 100%;
    opacity: 0.5;
  }

  &__content {
    position: absolute;
    pointer-events: initial;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.in-enter-active,
.in-leave-active {
  transition: all 0.3s;
}
.in-enter,
.in-leave-to {
  opacity: 0.5;
  transform: scale(1.2);
}
</style>
