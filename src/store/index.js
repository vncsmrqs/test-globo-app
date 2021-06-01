import Vue from 'vue';
import Vuex from 'vuex';

import auth from './auth';
import app from './app';
import admin from './admin';
import healthCheck from './health-check';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    admin,
    auth,
    app,
    healthCheck,
  },
});
