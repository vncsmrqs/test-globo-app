<template>
  <div class="px-4 lg:px-0 py-4 lg:py-0">
    <div class="flex justify-end mb-4">
      <base-button
        class="bg-primary text-white"
        :to="{ name: 'admin.user.create' }"
        link
        fab
        ring
      >
        <base-icon icon="plus" />
        <span class="hidden lg:inline-block">Novo usuário</span>
      </base-button>
    </div>
    <base-resource-error v-if="!!error" class="mb-4">
      Erro ao listar usuários: {{ error.message }}
    </base-resource-error>
    <div class="grid grid-cols-6 gap-4">
      <template v-if="loading">
        <base-card
          v-for="i in 3"
          :key="i"
          class="col-span-full h-32 p-4 flex flex-col"
          shadow
        >
          <div class="w-64 mb-4">
            <base-skeleton-loader
              class="rounded-lg h-10"
            ></base-skeleton-loader>
          </div>
          <base-skeleton-loader
            class="rounded-lg h-full"
          ></base-skeleton-loader>
        </base-card>
      </template>
      <template v-else>
        <base-card
          v-for="(user, index) in users.data"
          :key="index"
          class="col-span-full p-4 grid grid-cols-12 auto-flow-row gap-4"
          shadow
        >
          <div class="col-span-full lg:col-span-8">
            <div class="font-bold">{{ user.email }}</div>
            <role-label :role="user.accessLevel" />
          </div>
          <div class="col-span-full lg:col-span-4 flex justify-end">
            <base-button
              class="text-gray-400 hover:bg-primary-light hover:text-primary"
              :to="{ name: 'admin.user.edit', params: { email: user.email } }"
              link
              icon
              ring
            >
              <base-icon icon="pen" />
            </base-button>

            <base-button
              class="text-gray-400 hover:bg-primary-light hover:text-primary"
              @click="showDeleteUser"
              icon
              ring
            >
              <base-icon icon="trash" />
            </base-button>
          </div>
          <confirm-delete-modal
            :user="user"
            :show="deleteUser"
            @close="closeDeleteUser"
          />
        </base-card>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import RoleLabel from '../../../components/RoleLabel';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import BaseResourceError from '../../../components/Base/BaseResourceError';

export default {
  name: 'AdminUserIndex',
  components: { BaseResourceError, ConfirmDeleteModal, RoleLabel },
  data: () => ({
    deleteUser: false,
  }),
  computed: {
    ...mapGetters('admin/user', {
      users: 'users',
    }),
    loading() {
      return this.users.loading;
    },
    error() {
      return this.users.error;
    },
  },
  methods: {
    ...mapActions('admin/user', {
      fetchUsers: 'fetchUsers',
    }),
    showDeleteUser() {
      this.deleteUser = true;
    },
    closeDeleteUser() {
      this.deleteUser = false;
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped lang="scss"></style>
