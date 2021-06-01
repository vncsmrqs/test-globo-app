import AuthService from '@/services/AuthService';
import jwtDecode from 'jwt-decode';

const defaultUserData = () => ({
  email: '',
  accessLevel: '',
});

const localUser = localStorage.getItem('auth.user') || "{}";
const localToken = localStorage.getItem('auth.token');

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
    user: {
      ...defaultUserData(),
      ...JSON.parse(localUser),
    },
    token: localToken,
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
  isAuthenticated: (state) => !!state.auth.token,
  user: (state) => state.auth.user,
  abilities: (state) => [state.auth.user.accessLevel],
  isAdmin: (state) => state.auth.user.accessLevel === 'administrador',
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
  [types.SIGN_IN_SUCCESS](state, token) {
    state.signIn.loading = false;
    state.signIn.error = null;
    const user = jwtDecode(token);
    console.log({ user });
    state.auth.user = {
      ...defaultUserData(),
      ...user,
    };
    state.auth.token = token;
    localStorage.setItem('auth.user', JSON.stringify(state.auth.user));
    localStorage.setItem('auth.token', state.auth.token);
  },
  [types.SIGN_IN_ERROR](state, error) {
    state.signIn.loading = false;
    state.signIn.error = error;
    state.auth.token = null;
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
    state.auth.token = null;
    localStorage.removeItem('auth.user');
    localStorage.removeItem('auth.token');
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
      const authService = new AuthService();
      const { token } = await authService.signIn({ email, password });
      commit(types.SIGN_IN_SUCCESS, token);
      return token;
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
