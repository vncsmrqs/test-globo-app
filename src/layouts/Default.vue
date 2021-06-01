<template>
  <div class="w-full h-screen flex">
    <template v-if="!loading">
      <TheNavigationDrawer></TheNavigationDrawer>
      <main
        id="main-container"
        class="flex-1 min-h-screen overflow-auto bg-lightBlue-50"
      >
        <div class="max-w-screen-3xl w-full mx-auto min-h-full">
          <div class="min-screen"></div>
          <router-view></router-view>
        </div>
        <TheFooter></TheFooter>
      </main>
    </template>
    <the-splash-screen :loading="loading"></the-splash-screen>
  </div>
</template>

<script>
import TheFooter from '@/components/TheFooter';
import TheNavigationDrawer from '@/components/TheNavigationDrawer';
import TheSplashScreen from '@/components/TheSplashScreen';

export default {
  name: 'DefaultLayout',
  components: { TheSplashScreen, TheNavigationDrawer, TheFooter },
  data: () => ({
    loading: true,
  }),
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  },
};
</script>

<style scoped></style>
