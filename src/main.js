import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ability from './ability';
import './plugins';
import './styles/main.scss';
import './require-components';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  ability,
  render: (h) => h(App),
}).$mount('#app');
