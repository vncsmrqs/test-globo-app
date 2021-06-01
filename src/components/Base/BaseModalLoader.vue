<template>
  <base-modal :show="loading" content-class="w-full lg:max-w-sm p-4">
    <base-card class="px-4 py-8 lg:px-8 w-full" shadow>
      <div class="mb-2 text-center">
        <base-icon-loader class="text-lg"></base-icon-loader>
      </div>
      <div class="text-center">
        <slot> Carregando... </slot>
      </div>
    </base-card>
  </base-modal>
</template>

<script>
import BaseModal from './BaseModal';
import BaseCard from './BaseCard';
import BaseIconLoader from './BaseIconLoader';
export default {
  name: 'BaseModalLoader',
  components: { BaseIconLoader, BaseCard, BaseModal },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    loading(value) {
      this.handleLoading(value);
    },
  },
  methods: {
    handleLoading(value) {
      if (value) {
        return this.registerEvents();
      }
      this.removeEvents();
    },
    registerEvents() {
      document.body.addEventListener('keydown', this.handleKeyDown);
    },
    removeEvents() {
      document.body.removeEventListener('keydown', this.handleKeyDown);
    },
    handleKeyDown(event) {
      if (event.which === 9) {
        event.preventDefault();
      }
    },
  },
  mounted() {
    this.handleLoading(this.loading);
  },
};
</script>

<style scoped></style>
