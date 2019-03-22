const Router = require('koa-router');

const pageRouter = new Router();

pageRouter.get('/', async ctx => {
  await ctx.render('app');
});

module.exports = pageRouter;
