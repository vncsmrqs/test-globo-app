<template>
  <div class="">
    <div
      class="
        w-full
        h-16
        py-4
        px-2
        bg-white
        font-bold
        shadow
        flex
        items-center
        lg:hidden
      "
    >
      <base-button class="lg:hidden" @click="openNavigationDrawer" icon>
        <base-icon icon="bars" size="lg"></base-icon>
      </base-button>
      <span class="text-lg ml-2">{{ pageTitle }}</span>
    </div>
    <div class="hidden lg:block w-full font-bold text-4xl mb-2 text-gray-500">
      {{ pageTitle }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import { types as appMutations } from '@/store/app';

export default {
  name: 'TheHeader',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  computed: {
    ...mapGetters('app', {
      navigationDrawer: 'navigationDrawer',
    }),
    pageTitle() {
      return this.title || this.defaultPageTitle;
    },
    defaultPageTitle() {
      if (this.$route.meta.pageTitle) {
        return this.$route.meta.pageTitle;
      }
      const currentRoute = this.$route.matched.find((route, index) => {
        return index === this.$route.matched.length - 1;
      });
      return (
        currentRoute?.meta?.pageTitle || currentRoute?.parent?.meta?.pageTitle
      );
    },
  },
  methods: {
    ...mapMutations('app', {
      openNavigationDrawer: appMutations.OPEN_NAVIGATION_DRAWER,
    }),
  },
};
</script>

<style scoped></style>
