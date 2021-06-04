<template>
  <base-card class="p-4 lg:p-8" theme="white" shadow>
    <h1 class="font-bold text-2xl mb-4">Dados do Usuário</h1>
    <validation-observer
      ref="formCreateUser"
      tag="form"
      @submit.prevent="handleSubmit"
    >
      <div class="grid grid-cols-2 auto-flow-rows gap-4">
        <div
          class="
            col-span-full
            lg:col-span-1
            grid grid-cols-12
            auto-flow-rows
            gap-4
          "
        >
          <div class="col-span-full">
            <validation-provider
              name="email"
              rules="required"
              v-slot="{ errors }"
            >
              <base-input
                v-model="form.email"
                label="Nome"
                name="name"
                :has-errors="!!errors.length"
              >
                <span slot="validation" class="text-sm text-danger">{{
                  errors[0]
                }}</span>
              </base-input>
            </validation-provider>
          </div>
          <div class="col-span-full">
            <validation-provider
              name="nível de acesso"
              rules="required"
              v-slot="{ errors }"
            >
              <base-select
                v-model="form.accessLevel"
                label="Nível de acesso"
                name="acessLevel"
                :has-errors="!!errors.length"
              >
                <option value="administrador" selected>Administrador</option>
                <option vlaue="funcionario">Funcionário</option>
                <span slot="validation" class="text-sm text-danger">{{
                  errors[0]
                }}</span>
              </base-select>
            </validation-provider>
          </div>
        </div>
        <div
          class="
            col-span-full
            lg:col-span-1
            grid grid-cols-12
            auto-flow-rows
            gap-4
          "
        ></div>
        <div class="col-span-full mt-2">
          <base-button type="submit" class="w-auto bg-primary text-white" ring>
            Salvar
          </base-button>
        </div>
      </div>
    </validation-observer>
    <base-modal-loader :loading="isStoringUser">
      Salvando...
    </base-modal-loader>
    <base-modal-error v-if="canShowError" :show="true" @close="closeError">
      {{ storeUserError.message }}
    </base-modal-error>
    <base-modal-success v-if="canShowSuccess" :show="true">
      Sucesso ao salvar usuário!
    </base-modal-success>
  </base-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

extend('required', required);

export default {
  name: 'UserForm',
  components: { ValidationObserver, ValidationProvider },
  props: {
    user: {
      type: Object,
      required: false,
    },
  },
  data: () => ({
    form: {
      email: '',
      accessLevel: '',
    },
    canShowError: false,
    canShowSuccess: false,
  }),
  computed: {
    ...mapGetters('admin/user', {
      isStoringUser: 'isStoringUser',
      storeUserError: 'storeUserError',
    }),
  },
  methods: {
    ...mapActions('admin/user', {
      storeUser: 'storeUser',
    }),
    async handleSubmit() {
      try {
        const isValid = await this.$refs.formCreateUser.validate();
        if (!isValid) return;

        await this.storeUser({
          fields: this.form,
        });

        await this.showSuccess();

        this.$router.push({ name: 'admin.user.index' });
      } catch (e) {
        this.showError();
      }
    },
    showError() {
      this.canShowError = true;
    },
    closeError() {
      this.canShowError = false;
    },
    showSuccess() {
      this.canShowSuccess = true;
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 3000);
      });
    },
  },
  mounted() {
    if (this.user) {
      this.form = {
        ...this.form,
        ...this.user,
      };
    }
  },
};
</script>

<style scoped></style>
