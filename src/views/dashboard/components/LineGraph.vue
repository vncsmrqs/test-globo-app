<template>
  <base-card class="p-4" shadow>
    <h2 class="font-bold text-lg mb-4">{{ title }}</h2>
    <div class="flex justify-center">
      <apexchart
        class="w-full"
        type="line"
        :options="options"
        :series="series"
      />
    </div>
  </base-card>
</template>

<script>
export default {
  name: 'LineGraph',
  props: {
    title: {
      type: String,
      required: true,
    },
    labels: {
      type: Array,
      required: true,
    },
    series: {
      type: Array,
      required: true,
    },
    chartId: {
      type: String,
      required: true,
    },
  },
  computed: {
    options() {
      return {
        chart: {
          id: this.id,
          width: '100%',
        },
        xaxis: {
          categories: this.labels || [],
        },
      };
    },
  },
};
</script>
