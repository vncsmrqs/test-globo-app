<template>
  <transition name="fade">
    <div v-if="loading" class="the-splash-screen" style="z-index: 9999999">
      <div class="font-bold text-2xl">Carregando...</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'TheSplashScreen',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped lang="scss">
.the-splash-screen {
  @apply h-screen w-screen fixed top-0 left-0 flex justify-center items-center bg-white;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
