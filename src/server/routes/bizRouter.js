const Router = require('koa-router');

const bizRouter = new Router();

bizRouter.post('/get-table', ctx => {
  const total = 100;
  const { paging } = ctx.request.body;
  const items = [];

  for (let i = paging.skip + 1; i <= paging.skip + paging.max; i++) {
    if (i > total) break;

    const item = {
      id: i,
      code: `编码${i}`,
      name: `名称${i}`,
      wholeName: `完整名称${i}`,
      remark: `备注${i}`,
      lastModificationTime: '2018-08-06 14:21:24',
      lastModifierUserId: '某某'
    };
    items.push(item);
  }

  ctx.body = ctx.responseUtil.returnSuccess({ items, total });
});

module.exports = bizRouter;
