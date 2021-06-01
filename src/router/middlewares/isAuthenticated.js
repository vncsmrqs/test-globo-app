import store from '../../store';

export default async ({ next }) => {
  const isAuthenticated = store.getters['auth/isAuthenticated'];
  
  if (!isAuthenticated) {
    next({ name: 'auth.login' });
  } else {
    next();
  }
};
