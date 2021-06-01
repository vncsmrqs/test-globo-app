import auth from './auth';
import error from './error';
import admin from './admin';

import isAuthenticated from '../router/middlewares/isAuthenticated';
import isAuthorized from '../router/middlewares/isAuthorized';

export default [
  {
    path: '/',
    component: () => import('../layouts/Default.vue'),
    meta: {
      middlewares: [isAuthenticated, isAuthorized],
    },
    children: [
      {
        path: '/',
        name: 'dashboard',
        meta: {
          pageTitle: 'Dashboard',
        },
        component: () => import('./Dashboard.vue'),
      },
      ...admin,
    ],
  },
  {
    path: '/',
    component: () => import('../layouts/Guest.vue'),
    children: [...auth, ...error],
  },
  {
    path: '*',
    component: () => import('./error/PageNotFound.vue'),
  },
];
