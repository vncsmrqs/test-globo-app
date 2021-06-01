import Vue from 'vue';
import { install, Ability } from './main';
import store from '../store';

Vue.use(install);

const ability = new Ability({
  abilities: () => store.getters['auth/abilities'],
});

export default ability;
