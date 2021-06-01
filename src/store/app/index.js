export const types = {
  OPEN_NAVIGATION_DRAWER: 'OPEN_NAVIGATION_DRAWER',
  CLOSE_NAVIGATION_DRAWER: 'CLOSE_NAVIGATION_DRAWER',
};

const state = {
  navigationDrawer: {
    opened: false,
  },
};

const getters = {
  navigationDrawer: (state) => state.navigationDrawer,
};

const mutations = {
  [types.OPEN_NAVIGATION_DRAWER](state) {
    state.navigationDrawer.opened = true;
  },
  [types.CLOSE_NAVIGATION_DRAWER](state) {
    state.navigationDrawer.opened = false;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
