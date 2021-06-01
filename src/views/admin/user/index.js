export default [
  {
    path: 'users',
    component: () => import('./Layout'),
    meta: {
      pageTitle: 'Usuários',
    },
    children: [
      {
        path: '',
        meta: {
          ability: 'admin',
        },
        name: 'admin.user.index',
        component: () => import('./Index'),
      },
    ],
  },
];
