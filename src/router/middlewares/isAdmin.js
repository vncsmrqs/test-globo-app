import store from '../../store';

export default ({ next }) => {
  const isAdmin = store.getters['auth/isAdmin'];

  if (!isAdmin) {
    next({ name: 'error.permission-denied' });
  } else {
    next();
  }
};
