<template>
  <base-card class="p-4 lg:p-8 flex flex-col items-center justify-center">
    <base-icon-loader class="mr-4"></base-icon-loader>
    <slot></slot>
  </base-card>
</template>

<script>
import BaseCard from './BaseCard';
import BaseIconLoader from './BaseIconLoader';
export default {
  name: 'BaseResourceLoader',
  components: { BaseIconLoader, BaseCard },
};
</script>

<style scoped></style>
