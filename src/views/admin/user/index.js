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
          ability: 'administrador',
        },
        name: 'admin.user.index',
        component: () => import('./Index'),
      },
    ],
  },
];
