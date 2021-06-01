<template>
  <div>
    <div
      class="
        h-screen
        w-screen
        bg-primary
        flex
        justify-center
        content-center
        flex-col
        text-center
      "
    >
      <p class="font-sans text-white error-text">404</p>
      <p class="font-sans text-white text-xl font-bold">
        Página não encontrada.
      </p>
    </div>

    <div
      class="
        absolute
        w-screen
        bottom-0
        mb-6
        text-white text-center
        font-sans
        text-xl
      "
    >
      <span class="opacity-50">Voltar para</span>
      <router-link :to="{ name: 'dashboard' }" class="border-b"
        >Página inicial</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageNotFound',
};
</script>

<style scoped lang="scss">
.error-text {
  font-size: 130px;
  @include viewport($breakpoint-md) {
    font-size: 220px;
  }
}
</style>
