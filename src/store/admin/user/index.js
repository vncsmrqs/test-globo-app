import UserService from '@/services/UserService';

export const types = {
  // FECTH USERS
  FETCH_USERS_START: 'FETCH_USERS_START',
  FETCH_USERS_SUCCESS: 'FETCH_USERS_SUCCESS',
  FETCH_USERS_ERROR: 'FETCH_USERS_ERROR',
};

const state = {
  fetchUsers: {
    data: [],
    loading: false,
    error: null,
  },
};

const getters = {
  // INDEX
  users: (state) => state.fetchUsers,
};

const mutations = {
  // INDEX
  [types.FETCH_USERS_START](state) {
    state.fetchUsers.loading = true;
    state.fetchUsers.error = null;
  },
  [types.FETCH_USERS_SUCCESS](state, { users }) {
    state.fetchUsers.loading = false;
    state.fetchUsers.data = users;
    state.fetchUsers.error = null;
  },
  [types.FETCH_USERS_ERROR](state, error) {
    state.fetchUsers.loading = false;
    state.fetchUsers.error = error;
  },
};

const actions = {
  async fetchUsers({ commit }) {
    commit(types.FETCH_USERS_START);
    const userService = new UserService();
    return await userService
      .index()
      .then((users) => {
        commit(types.FETCH_USERS_SUCCESS, { users });
        return users;
      })
      .catch((error) => {
        commit(types.FETCH_USERS_ERROR, error);
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
