<template>
  <base-modal
    :show="show"
    @close="$emit('close')"
    content-class="w-full lg:max-w-sm p-4"
  >
    <base-resource-success>
      <slot></slot>
    </base-resource-success>
  </base-modal>
</template>

<script>
import BaseModal from './BaseModal';
import BaseResourceSuccess from './BaseResourceSuccess';

export default {
  name: 'BaseModalError',
  components: { BaseResourceSuccess, BaseModal },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    error: {
      type: Error,
      default: null,
    },
  },
  watch: {
    show(value) {
      this.handleShow(value);
    },
  },
  methods: {
    handleShow(value) {
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
    this.handleShow(this.show);
  },
};
</script>

<style scoped></style>
