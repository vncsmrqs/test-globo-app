<template>
  <span class="base-icon-loader text-primary">
    <base-icon class="base-icon-loader__icon" icon="spinner"></base-icon>
  </span>
</template>

<script>
import BaseIcon from './BaseIcon';
export default {
  name: 'BaseIconLoader',
  components: { BaseIcon },
};
</script>

<style lang="scss">
.base-icon-loader {
  &__icon {
    animation-name: spin;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }
}
</style>
