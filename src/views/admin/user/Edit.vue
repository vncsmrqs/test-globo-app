<template>
  <div class="mx-auto p-4 lg:p-0">
    <base-card v-if="loading" class="p-4 lg:p-8" shadow>
      <div class="w-64 h-10 mb-8">
        <base-skeleton-loader class="h-full rounded-lg" />
      </div>
      <div v-for="i in 2" :key="i">
        <div class="w-40 max-w-md h-4 mb-1">
          <base-skeleton-loader class="h-full rounded-lg" />
        </div>
        <div class="w-full max-w-md h-10 mb-4">
          <base-skeleton-loader class="h-full rounded-lg" />
        </div>
      </div>
      <div class="w-32 h-12">
        <base-skeleton-loader class="h-full rounded-lg" />
      </div>
    </base-card>
    <user-form v-else-if="user && !loading" :user="user" />
  </div>
</template>

<script>
import UserForm from './components/UserForm';
import BaseSkeletonLoader from '../../../components/Base/BaseSkeletonLoader';

export default {
  name: 'AdminUserEdit',
  components: { BaseSkeletonLoader, UserForm },
  data: () => ({
    loading: false,
    error: null,
    user: null,
  }),
  computed: {},
  methods: {
    async fetchUser(email) {
      try {
        this.loading = true;
        this.user = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              email: email,
              accessLevel: 'administrador',
            });
          }, 3000);
        });
        this.error = null;
      } catch (e) {
        this.error = e;
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    const email = this.$route.params.email;
    this.fetchUser(email);
    document.querySelector('#main-container').scrollTo(0, 0);
  },
};
</script>

<style scoped></style>
