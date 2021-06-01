import user from './user';

import isAdmin from '@/router/middlewares/isAdmin';

export default [
  {
    path: 'admin',
    component: () => import('./Layout'),
    meta: {
      middlewares: [isAdmin],
      pageTitle: 'Painel Principal',
    },
    children: [...user],
  },
];
