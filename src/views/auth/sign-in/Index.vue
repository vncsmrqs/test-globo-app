<template>
  <div
    class="sign-in-page w-full lg:min-h-screen relative flex items-center"
  >
    <div class="lg:mx-8 w-full flex items-center justify-center">
      <base-card
        class="w-full lg:max-w-sm p-4 md:p-8 rounded-b-none lg:rounded-b-2xl"
        shadow
      >
        <SignInForm class="mb-8" />
      </base-card>
    </div>
  </div>
</template>

<script>
import SignInForm from './components/SignInForm';

export default {
  name: 'SignIn',
  components: { SignInForm },
};
</script>

<style lang="scss">
.sign-in-page {
  @apply bg-primary-dark;
  &__container {
    position: relative;
    z-index: 1;
  }
}
</style>
