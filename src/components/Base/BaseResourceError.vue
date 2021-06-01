<template>
  <base-card theme="danger" class="p-4 lg:p-8">
    <slot v-if="$slots.default"></slot>
    <template v-else>
      {{ error.message }}
    </template>
  </base-card>
</template>

<script>
import BaseCard from './BaseCard';
export default {
  name: 'BaseResourceError',
  components: { BaseCard },
  props: {
    error: {
      type: Error,
      default: () => new Error('Algo deu errado!'),
    },
  },
};
</script>

<style scoped></style>
