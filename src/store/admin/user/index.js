import UserService from '@/services/UserService';

export const types = {
  // FECTH USERS
  FETCH_USERS_START: 'FETCH_USERS_START',
  FETCH_USERS_SUCCESS: 'FETCH_USERS_SUCCESS',
  FETCH_USERS_ERROR: 'FETCH_USERS_ERROR',
  // STORE USER
  STORE_USER_START: 'STORE_USER_START',
  STORE_USER_SUCCESS: 'STORE_USER_SUCCESS',
  STORE_USER_ERROR: 'STORE_USER_ERROR',
};

const state = {
  fetchUsers: {
    data: [],
    loading: false,
    error: null,
  },
  storeUser: {
    loading: false,
    error: null,
  },
};

const getters = {
  // INDEX
  users: (state) => state.fetchUsers,
  // STORE
  isStoringUser: (state) => state.storeUser.loading,
  storeUserError: (state) => state.storeUser.error,
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
  // STORE
  [types.STORE_USER_START](state) {
    state.storeUser.loading = true;
    state.storeUser.error = null;
  },
  [types.STORE_USER_SUCCESS](state) {
    state.storeUser.loading = false;
    state.storeUser.error = null;
  },
  [types.STORE_USER_ERROR](state, error) {
    state.storeUser.loading = false;
    state.storeUser.error = error;
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
  async storeUser({ commit }, { fields }) {
    commit(types.STORE_USER_START);
    return await new Promise((resolve) => {
      setTimeout(() => {
        commit(types.STORE_USER_SUCCESS);
        resolve(fields);
      }, 3000);
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
