export default [
  {
    path: 'erro',
    component: {
      render(c) {
        return c('router-view');
      },
    },
    children: [
      {
        path: '',
        redirect: { name: 'error.page-not-found' },
      },
      {
        path: 'permissao-negada',
        name: 'error.permission-denied',
        component: () => import('./PermissionDenied'),
      },
      {
        path: 'pagina-nao-encontrada',
        name: 'error.page-not-found',
        component: () => import('./PageNotFound'),
      },
    ],
  },
];
