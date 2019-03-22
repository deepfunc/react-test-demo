const Router = require('koa-router');
const bizRouter = require('./bizRouter');

const rootRouter = new Router();

rootRouter.use('/api/biz', bizRouter.routes(), bizRouter.allowedMethods());

module.exports = rootRouter;
