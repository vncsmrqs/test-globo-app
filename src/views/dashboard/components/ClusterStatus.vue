<template>
  <base-card class="p-4 flex flex-col" shadow>
    <h2 class="font-bold text-lg mb-4">Status do cluster</h2>
    <div :class="clusterStatusClass" class="p-4 rounded-lg border flex items-center h-full justify-center">
      <div class="w-4 h-4 rounded-full" :class="[`bg-${clusterStatusColor}`]"></div>
      <div class="ml-2">{{ clusterStatusText }}</div>
    </div>
  </base-card>
</template>

<script>
export default {
  name: 'ClusterStatus',
  props: {
    status: {
      type: String,
      required: true,
      validator(status) {
        const isValid = ['green', 'red', 'yellow'].includes(status);
        if(!isValid) {
          console.warn(
            `Invalid prop "${status}", available values are "green", "red", "yellow".`
          );
          return false;
        }
        return true;
      },
    },
  },
  computed: {
    clusterStatusClass() {
      return [
        `bg-${this.clusterStatusColor}-light`,
        `text-${this.clusterStatusColor}`,
        `border-${this.clusterStatusColor}`,
      ];
    },
    clusterStatusColor() {
      switch (this.status) {
        case 'green':
          return 'success';
        case 'red':
          return 'danger';
        case 'yellow':
          return 'waring';
        default:
          return '';
      }
    },
    clusterStatusText() {
      switch (this.status) {
        case 'green':
          return 'Sem problemas';
        case 'red':
          return 'Fora do ar';
        case 'yellow':
          return 'Precisa de atenção';
        default:
          return 'Sem informação';
      }
    },
  },
};
</script>

<style scoped>

</style>
