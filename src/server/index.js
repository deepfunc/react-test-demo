const Koa = require('koa');
const session = require('koa-session');
const mount = require('koa-mount');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const routeErrorHandler = require('./routes/routeErrorHandler');
const rootRouter = require('./routes/rootRouter');
const pageRouter = require('./routes/pageRouter');
const path = require('path');
const debug = require('debug');
const responseUtil = require('./utils/responseUtil');

const app = new Koa();
const appDebug = debug('react-test-demo:server');
const cwd = process.cwd();
app.context.responseUtil = responseUtil;

/**
 * set signed cookie keys.
 */
app.keys = ['react-test-demo'];

/**
 * set session
 */
const sessionConfig = {
    key: 'biz:sid', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 604800,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: true /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. default is false **/
};
app.use(session(sessionConfig, app));

/**
 * static resources
 */
app.use(mount('/dist', serve(path.join(cwd, 'dist'))));

/**
 * A body parser for koa, base on co-body. support json, form and text type body.
 */
app.use(bodyParser({formLimit: '10mb', jsonLimit: '10mb'}));

/**
 * Template rendering middleware for koa.
 */
app.use(views(path.join(cwd, 'src/server/views'), {extension: 'ejs'}));

/**
 * biz router
 */
app
    .use(routeErrorHandler)
    .use(rootRouter.routes())
    .use(rootRouter.allowedMethods());

/**
 * page router
 */
app
    .use(pageRouter.routes())
    .use(pageRouter.allowedMethods());

app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});

appDebug('current env: ' + app.env);
app.listen(3000, () => console.log('Listening on port: 3000'));
