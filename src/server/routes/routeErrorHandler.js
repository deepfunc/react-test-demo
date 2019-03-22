const routeErrorHandler = async (ctx, next) => {
  await next();
  const status = ctx.status || 404;
  if (status === 404) {
    ctx.status = 404;
    ctx.body = 'Sorry, Not Found';
  }
};

module.exports = routeErrorHandler;
