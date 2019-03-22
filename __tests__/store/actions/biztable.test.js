import * as type from '@/store/types/bizTable';
import * as actions from '@/store/actions/bizTable';

/* 测试 bizTable 相关 actions */
describe('bizTable actions', () => {

  /* 测试获取数据请求 */
  test('should create an action for get data request', () => {
    const expectedAction = { type: type.BIZ_TABLE_GET_REQ };

    expect(actions.getBizTableData()).toEqual(expectedAction);
  });

  /* 测试返回正常数据结果 */
  test('should create an action for successful result of get data', () => {
    const payload = {
      items: [
        { id: 1, code: '1' },
        { id: 2, code: '2' }
      ],
      total: 2
    };
    const expectedAction = {
      type: type.BIZ_TABLE_GET_RES_SUCCESS,
      payload
    };

    expect(actions.putBizTableDataSuccessResult(payload)).toEqual(expectedAction);
  });

  /* 测试返回异常数据结果 */
  test('should create an action for failing result of get data', () => {
    const expectedAction = { type: type.BIZ_TABLE_GET_RES_FAIL };

    expect(actions.putBizTableDataFailResult()).toEqual(expectedAction);
  });

  /* 测试改变 table 相关参数（分页） */
  test('should create an action for update table params', () => {
    const payload = {
      paging: { current: 2, pageSize: 25 }
    };
    const expectedAction = {
      type: type.BIZ_TABLE_PARAMS_UPDATE,
      payload
    };

    expect(actions.updateBizTableParams(payload)).toEqual(expectedAction);
  });

  /* 测试刷新 */
  test('should create an action for reload', () => {
    const expectedAction = { type: type.BIZ_TABLE_RELOAD };

    expect(actions.reloadBizTableData()).toEqual(expectedAction);
  });
});
