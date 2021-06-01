<template>
  <div>
    <the-header class="lg:px-8 lg:mt-8" />
    <div class="lg:px-8 lg:mt-8">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TheHeader from './admin/components/TheHeader';

export default {
  name: 'Dashboard',
  components: { TheHeader },
};
</script>

<style scoped></style>
