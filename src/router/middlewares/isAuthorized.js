import permission from '../../ability';

export default async ({ to, next }) => {
  try {
    const permissionDenied = to.matched.some((route) => {
      const ability = route.meta.ability;
      return permission.cannot(ability);
    });

    if (permissionDenied) {
      next({ name: 'error.permission-denied' });
    } else {
      next();
    }
  } catch (error) {
    next({ name: 'error.permission-denied' });
  }
};
