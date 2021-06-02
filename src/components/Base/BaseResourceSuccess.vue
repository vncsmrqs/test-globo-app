<template>
  <base-card theme="success" class="p-4 lg:p-8">
    <slot v-if="$slots.default"></slot>
    <template v-else> Sucesso </template>
  </base-card>
</template>

<script>
import BaseCard from './BaseCard';
export default {
  name: 'BaseResourceError',
  components: { BaseCard },
};
</script>

<style scoped></style>
