<template>
  <div>
    <the-header class="lg:px-8 lg:mt-8" />
    <div class="lg:px-8 lg:mt-8 p-4 lg:p-8 grid grid-cols-6 gap-4 lg:gap-8">
      <base-resource-error v-if="!!error" class="col-span-full">
        Erro ao buscar dados do dashboard: {{ error.message }}
      </base-resource-error>
      <template v-if="loading">
        <base-card
          v-for="i in 3"
          :key="i"
          class="
            col-span-full
            lg:col-span-3
            xl:col-span-2
            h-64
            p-4
            flex flex-col
          "
          shadow
        >
          <div class="w-32 mb-4">
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
        <line-graph
          class="col-span-full lg:col-span-3 xl:col-span-2"
          :labels="cpuChartData.labels"
          :series="cpuChartData.series"
          chart-id="cpu-usage-chart"
          title="Consumo de CPU"
        />
        <line-graph
          class="col-span-full lg:col-span-3 xl:col-span-2"
          :labels="memoryChartData.labels"
          :series="memoryChartData.series"
          chart-id="memory-usage-chart"
          title="Consumo de memória"
        />
        <cluster-status
          :status="clusterStatusData"
          class="col-span-full xl:col-span-2 xl:col-span-2"
        />
      </template>
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader';
import { mapGetters, mapActions } from 'vuex';
import LineGraph from './components/LineGraph';
import ClusterStatus from './components/ClusterStatus';
import BaseSkeletonLoader from '../../components/Base/BaseSkeletonLoader';

export default {
  name: 'Dashboard',
  components: { BaseSkeletonLoader, ClusterStatus, LineGraph, TheHeader },
  data: () => ({}),
  computed: {
    ...mapGetters('healthCheck', {
      healthMetrics: 'healthMetrics',
    }),
    loading() {
      return this.healthMetrics.loading;
    },
    error() {
      return this.healthMetrics.error;
    },
    clusterStatusData() {
      return this.healthMetrics.data.cluster.status || 'no-info';
    },
    cpuChartData() {
      const { labels, data } = this.healthMetrics.data.cpu;
      return {
        labels,
        series: [
          {
            name: 'CPU (%)',
            data: data || [],
          },
        ],
      };
    },
    memoryChartData() {
      const { labels, data } = this.healthMetrics.data.memory;
      return {
        labels,
        series: [
          {
            name: 'Memória (%)',
            data: data.map((num) => parseFloat(num).toFixed(2)),
          },
        ],
      };
    },
  },
  methods: {
    ...mapActions('healthCheck', {
      fetchHealthCheck: 'fetchHealthCheck',
    }),
  },
  mounted() {
    this.fetchHealthCheck();
  },
};
</script>

<style scoped></style>
