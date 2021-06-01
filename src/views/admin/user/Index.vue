<template>
  <div>Lista de usuários</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'AdminUserIndex',
  computed: {
    ...mapGetters('admin/user', {
      users: 'users',
    }),
  },
  methods: {
    ...mapActions('admin/user', {
      fetchUsers: 'fetchUsers',
    }),
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped lang="scss"></style>
