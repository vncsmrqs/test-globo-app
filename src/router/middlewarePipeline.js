const nextFactory = (context, middlewares, index) => {
  const subsequentMiddleware = middlewares[index];

  if (!subsequentMiddleware) {
    return context.next;
  }

  return async (route) => {
    if (route) {
      return context.next(route);
    }
    const nextMiddleware = nextFactory(context, middlewares, index + 1);
    return await subsequentMiddleware({ ...context, next: nextMiddleware });
  };
};

const middlewarePipeline = async (to, from, next) => {
  let middlewares = to.matched.reduce((middlewares, record) => {
    if (record.meta.middlewares && record.meta.middlewares.length) {
      middlewares = [...middlewares, ...record.meta.middlewares];
    }
    return middlewares;
  }, []);

  if (!middlewares || !middlewares.length) {
    return next();
  }

  const context = {
    to,
    from,
    next,
  };

  return await middlewares[0]({
    ...context,
    next: nextFactory(context, middlewares, 1),
  });
};

export default middlewarePipeline;
