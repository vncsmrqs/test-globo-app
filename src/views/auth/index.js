import isGuest from '@/router/middlewares/isGuest';

export default [
  {
    path: '',
    component: () => import('./Layout'),
    meta: {
      middlewares: [isGuest],
    },
    children: [
      {
        path: '',
        redirect: { name: 'dashboard' },
      },
      {
        path: 'login',
        name: 'auth.login',
        component: () => import('./sign-in/Index.vue'),
      },
    ],
  },
];
