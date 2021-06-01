<template>
  <div class="mt-4 grid grid-cols-1 auto-row-auto gap-4">
    <div class="col-span-full">
      <h1 class="font-bold text-2xl">Fazer login</h1>
    </div>
    <div>
      <base-modal-loader :loading="loadingSignIn">
        Verificando dados...
      </base-modal-loader>
    </div>
    <div
      v-if="signInError"
      class="
        col-span-full
        border border-danger
        bg-danger-light
        text-danger
        p-4
        rounded
      "
    >
      {{ signInError.message }}
    </div>
    <div class="col-span-full text-sm">
      <base-input
        label="E-mail"
        class="mt-1"
        type="email"
        id="email"
        v-model="form.email"
        placeholder="Email"
        autofocus
      ></base-input>
    </div>
    <div class="col-span-full text-sm">
      <base-input
        label="Senha"
        class="mt-1"
        type="password"
        id="password"
        v-model="form.password"
        placeholder="Senha"
        autofocus
      ></base-input>
    </div>
    <div class="col-span-full flex justify-end">
      <base-button
        @click="handleLogin"
        class="w-full bg-secondary text-white"
        ring
      >
        Entrar
      </base-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'SignInForm',
  data: () => ({
    form: {
      email: '',
      password: '',
    },
  }),
  computed: {
    ...mapGetters('auth', {
      signInError: 'signInError',
      loadingSignIn: 'loadingSignIn',
    }),
  },
  methods: {
    ...mapActions('auth', {
      signIn: 'signIn',
    }),
    handleLogin() {
      this.signIn(this.form).then(() => {
        this.$router.push('/');
      });
    },
  },
};
</script>

<style scoped></style>
