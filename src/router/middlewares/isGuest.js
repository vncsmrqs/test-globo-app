import store from '../../store';

export default async ({ next }) => {
  const isAuthenticated = store.getters['auth/isAuthenticated'];

  if (isAuthenticated) {
    return next({ name: 'dashboard' });
  }

  return next();
};
