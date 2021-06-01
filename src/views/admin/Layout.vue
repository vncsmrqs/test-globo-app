<template>
  <div>
    <the-header class="lg:px-8 lg:mt-8" />
    <div class="lg:px-8 lg:mt-8">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { types as appMutations } from '@/store/app';
import TheHeader from './components/TheHeader';

export default {
  name: 'AdminLayout',
  components: { TheHeader },
  computed: {
    ...mapGetters('app', {
      navigationDrawer: 'navigationDrawer',
    }),
  },
  methods: {
    ...mapMutations('app', {
      openNavigationDrawer: appMutations.OPEN_NAVIGATION_DRAWER,
    }),
  },
};
</script>
