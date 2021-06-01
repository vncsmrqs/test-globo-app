import Vue from 'vue';
import { install, Ability } from './main';

Vue.use(install);

const ability = new Ability({
  abilities: () => [],
});

export default ability;
