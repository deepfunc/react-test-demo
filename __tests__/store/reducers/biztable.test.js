import * as type from '@/store/types/bizTable';
import reducer, { defaultState } from '@/store/reducers/bizTable';

/* 测试 bizTable reducer */
describe('bizTable reducer', () => {
    /* 测试未指定 state 参数情况下返回当前缺省 state */
    test('should return the default state', () => {
        expect(reducer(undefined, {type: 'UNKNOWN'})).toEqual(defaultState);
    });

    /* 测试处理获取数据请求 */
    test('should handle get data request', () => {
        const expectedState = defaultState.set('loading', true);

        expect(
            reducer(defaultState, {
                type: type.BIZ_TABLE_GET_REQ
            })
        ).toEqual(expectedState);
    });

    /* 测试处理正常数据结果 */
    test('should handle successful data response', () => {
        /* 模拟返回数据结果 */
        const payload = {
            items: [
                {id: 1, code: '1'},
                {id: 2, code: '2'}
            ],
            total: 2
        };
        /* 期望返回的状态 */
        const expectedState = defaultState
            .setIn(['pagination', 'total'], payload.total)
            .set('data', payload.items)
            .set('loading', false);

        expect(
            reducer(defaultState, {
                type: type.BIZ_TABLE_GET_RES_SUCCESS,
                payload
            })
        ).toEqual(expectedState);
    });

    /* 测试处理异常数据结果 */
    test('should handle failing data response', () => {
        const expectedState = defaultState.set('loading', false);

        expect(
            reducer(defaultState, {
                type: type.BIZ_TABLE_GET_RES_FAIL
            })
        ).toEqual(expectedState);
    });

    /* 测试处理更新 table 参数（分页） */
    test('should handle updating of table params', () => {
        const payload = {
            paging: {current: 3, pageSize: 40}
        };
        const expectedState = defaultState
            .setIn(['pagination', 'current'], payload.paging.current)
            .setIn(['pagination', 'pageSize'], payload.paging.pageSize);

        expect(
            reducer(defaultState, {
                type: type.BIZ_TABLE_PARAMS_UPDATE,
                payload
            })
        ).toEqual(expectedState);
    });
});