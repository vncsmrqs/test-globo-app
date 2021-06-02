import HealthCheckService from '@/services/HealthCheckService';

const defaultHealthMetricsData = () => ({
  cpu: {
    labels: [],
    data: [],
  },
  memory: {
    labels: [],
    data: [],
  },
  cluster: {
    status: null,
  },
});
export const types = {
  // FECTH HEALTH CHECK
  FETCH_HEALTH_CHECK_START: 'FETCH_HEALTH_CHECK_START',
  FETCH_HEALTH_CHECK_SUCCESS: 'FETCH_HEALTH_CHECK_SUCCESS',
  FETCH_HEALTH_CHECK_ERROR: 'FETCH_HEALTH_CHECK_ERROR',
};

const state = {
  fetchHealthCheck: {
    data: defaultHealthMetricsData(),
    loading: false,
    error: null,
  },
};

const getters = {
  // INDEX
  healthMetrics: (state) => state.fetchHealthCheck,
};

const mutations = {
  // INDEX
  [types.FETCH_HEALTH_CHECK_START](state) {
    state.fetchHealthCheck.loading = true;
    state.fetchHealthCheck.error = null;
  },
  [types.FETCH_HEALTH_CHECK_SUCCESS](state, healthMetrics) {
    state.fetchHealthCheck.loading = false;
    state.fetchHealthCheck.data = {
      ...defaultHealthMetricsData(),
      ...healthMetrics,
    };
    state.fetchHealthCheck.error = null;
  },
  [types.FETCH_HEALTH_CHECK_ERROR](state, error) {
    state.fetchHealthCheck.loading = false;
    state.fetchHealthCheck.error = error;
  },
};

const actions = {
  async fetchHealthCheck({ commit }) {
    commit(types.FETCH_HEALTH_CHECK_START);
    const healthCheckService = new HealthCheckService();
    return await healthCheckService
      .index()
      .then((healthMetrics) => {
        commit(types.FETCH_HEALTH_CHECK_SUCCESS, healthMetrics);
        return healthMetrics;
      })
      .catch((error) => {
        commit(types.FETCH_HEALTH_CHECK_ERROR, error);
        throw error;
      });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
