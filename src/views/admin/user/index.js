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
        name: 'admin.user.index',
        component: () => import('./Index'),
      },
      {
        meta: {
          pageTitle: 'Cadastrar usuário',
        },
        path: 'create',
        name: 'admin.user.create',
        component: () => import('./Create'),
      },
      {
        meta: {
          pageTitle: 'Editar usuário',
        },
        path: ':email',
        name: 'admin.user.edit',
        component: () => import('./Edit'),
      },
    ],
  },
];
