import { authService } from '@/services';

const defaultUserData = () => ({
  email: '',
  accessLevel: '',
});

export const types = {
  SIGN_IN_START: 'SIGN_IN_START',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
  SIGN_IN_ERROR: 'SIGN_IN_ERROR',
  SIGN_OUT_START: 'SIGN_OUT_START',
  SIGN_OUT_SUCCESS: 'SIGN_OUT_SUCCESS',
  SIGN_OUT_ERROR: 'SIGN_OUT_ERROR',
};

const state = {
  auth: {
    user: defaultUserData(),
    authenticated: false,
  },
  signIn: {
    loading: false,
    error: null,
  },
  signOut: {
    loading: false,
    error: null,
  },
};

const getters = {
  isAuthenticated: (state) => state.auth.authenticated,
  user: (state) => state.auth.user,
  abilities: (state) => [state.user.data.accessLevel],
  isAdmin: (state) => state.user.data.accessLevel === 'administrador',
  signInError: (state) => state.signIn.error,
  loadingSignIn: (state) => state.signIn.loading,
  signOutError: (state) => state.signOut.error,
  loadingSignOut: (state) => state.signOut.loading,
};

const mutations = {
  [types.SIGN_IN_START](state) {
    state.signIn.loading = true;
    state.signIn.error = null;
  },
  [types.SIGN_IN_SUCCESS](state, user) {
    state.signIn.loading = false;
    state.signIn.error = null;
    state.auth.user = {
      ...defaultUserData(),
      ...user,
    };
    state.auth.authenticated = true;
  },
  [types.SIGN_IN_ERROR](state, error) {
    state.signIn.loading = false;
    state.signIn.error = error;
    state.auth.authenticated = true;
    state.auth.user = defaultUserData();
  },
  [types.SIGN_OUT_START](state) {
    state.signOut.loading = true;
    state.signOut.error = null;
  },
  [types.SIGN_OUT_SUCCESS](state) {
    state.signOut.loading = false;
    state.signOut.error = null;
    state.auth.user = defaultUserData();
    state.auth.authenticated = false;
  },
  [types.SIGN_OUT_ERROR](state, error) {
    state.signOut.loading = false;
    state.signOut.error = error;
  },
};

const actions = {
  async signIn({ commit }, { email, password }) {
    commit(types.SIGN_IN_START);
    try {
      const { user } = await authService.signIn({ email, password });
      commit(types.SIGN_IN_SUCCESS, user);
      return user;
    } catch (error) {
      commit(types.SIGN_IN_ERROR, error);
      throw error;
    }
  },
  async signOut({ commit }) {
    commit(types.SIGN_OUT_START);
    commit(types.SIGN_OUT_SUCCESS);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
