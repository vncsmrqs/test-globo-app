<script>
export default {
  inheritAttrs: false,
  props: {
    src: {
      type: String,
      required: true,
    },
    lazySrc: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
  mounted() {
    if (!this.lazySrc) {
      this.$refs.image.src = this.src;
    } else {
      this.handleLazyImage({
        el: this.$refs.image,
        src: this.src,
        lazySrc: this.lazySrc,
      });
    }
  },
  methods: {
    handleLazyImage({ el, src }) {
      this.$refs.image.classList.add('blur');

      const imgOptions = {
        threshold: 0.2,
      };

      const imgObserver = new IntersectionObserver((entries, imgObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && this.$refs.image) {
            const img = entry.target;
            img.src = src;
            this.$refs.image.classList.remove('blur');
            imgObserver.unobserve(entry.target);
          }
        });
      }, imgOptions);

      imgObserver.observe(el);
    },
  },
};
</script>

<template>
  <img ref="image" class="base-image" :src="lazySrc" v-bind="$attrs" />
</template>

<style lang="scss" scoped>
.base-image {
  transition: all 0.5s ease;
  &.blur {
    filter: blur(10px);
  }
}
</style>
