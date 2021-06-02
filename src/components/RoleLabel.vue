<template>
  <span
    class="inline-block px-2 text-center rounded-md text-white text-sm"
    :class="themeClasses"
  >
    {{ label }}
  </span>
</template>

<script>
export default {
  name: 'RoleLabel',
  props: {
    role: {
      type: String,
      required: true,
    },
  },
  computed: {
    label() {
      if (this.role === 'administrador') {
        return 'ADMINISTRADOR';
      }
      return 'FUNCIONÁRIO';
    },
    theme() {
      if (this.role === 'administrador') {
        return 'danger';
      }
      return 'primary';
    },
    themeClasses() {
      return [
        `bg-${this.theme}-light`,
        `border border-${this.theme}`,
        `text-${this.theme}`,
      ];
    },
  },
};
</script>

<style scoped></style>
