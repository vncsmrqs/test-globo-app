import Vue from 'vue';
import VueRouter from 'vue-router';
import middlewarePipeline from './middlewarePipeline';

import routes from '../views';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

router.beforeEach(middlewarePipeline);

export default router;
