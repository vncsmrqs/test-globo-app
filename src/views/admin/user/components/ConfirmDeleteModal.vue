<template>
  <base-modal :show="show" @close="close" content-class="px-4">
    <base-card class="p-4 lg:p-8 w-full lg:max-w-lg" shadow>
      <div class="flex justify-between text-lg font-bold mb-4">
        Tem certeza que deseja excluir este usuário?
        <div class="-mt-2 -mr-2 lg:-mt-4 lg:-mr-4">
          <base-button @click="close" icon ring>
            <base-icon icon="times" />
          </base-button>
        </div>
      </div>
      <div class="flex justify-end">
        <base-button class="mr-4" @click="deleteCourse" ring>
          Excluir
        </base-button>
        <base-button class="bg-primary text-white" @click="close" ring>
          Cancelar
        </base-button>
      </div>
      <base-modal-loader :loading="loading">Excluindo...</base-modal-loader>
      <base-modal-error v-if="canShowError" :show="true" @close="closeError">
        {{ error.message }}
      </base-modal-error>
      <base-modal-success v-if="canShowSuccess" :show="true">
        Usuário excluido com sucesso!
      </base-modal-success>
    </base-card>
  </base-modal>
</template>

<script>
export default {
  name: 'ConfirmDeleteModal',
  props: {
    user: {
      type: Object,
      required: true,
    },
    show: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    error: null,
    loading: false,
    canShowError: false,
    canShowSuccess: false,
  }),
  methods: {
    close() {
      this.$emit('close');
    },
    showError() {
      this.canShowError = true;
    },
    closeError() {
      this.canShowError = false;
    },
    async deleteCourse() {
      try {
        this.loading = true;
        this.close();
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 3000);
        });
        this.showSuccess();
      } catch (e) {
        this.error = e;
        this.showError();
      } finally {
        this.loading = false;
      }
    },
    showSuccess() {
      this.canShowSuccess = true;
      setTimeout(() => {
        this.canShowSuccess = false;
      }, 3000);
    },
  },
};
</script>

<style scoped></style>
