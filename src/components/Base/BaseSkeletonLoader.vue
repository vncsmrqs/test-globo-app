<script>
export default {
  name: 'BaseSkeletonLoader',
};
</script>

<template>
  <div class="base-skeleton-loader"></div>
</template>

<style lang="scss" scoped>
.base-skeleton-loader {
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  cursor: progress;
  width: 100%;

  &::after {
    background: linear-gradient(
      90deg,
      hsla(0, 0%, 100%, 0),
      hsla(0, 0%, 100%, 0.05),
      hsla(0, 0%, 100%, 0)
    );
    animation: loading 1.5s infinite;
    content: '';
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transform: translateX(-100%);
    z-index: 1;
  }

  @keyframes loading {
    to {
      transform: translateX(100%);
    }
  }
}
</style>
