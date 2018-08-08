import { put, select } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import * as saga from '@/store/sagas/bizTable';
import * as actions from '@/store/actions/bizTable';
import { getBizToolbar, getBizTable } from '@/store/selectors';
import * as api from '@/services/bizApi';

/* 测试 bizTable saga */
describe('bizToolbar saga', () => {
    /* 测试 bizTable 业务流入口 */
    test('should watch bizToolbar flow', () => {
        const gen = saga.watchBizTableFlow();

        expect(gen.next().value['ALL']).toHaveLength(3);
        expect(gen.next().done).toBe(true);
    });

    /* 测试更新 table 参数（分页）时是否触发 bizTable 请求数据 */
    test('when update table params should request data', () => {
        const gen = saga.onUpdateBizTableParams();

        expect(gen.next().value).toEqual(put(actions.getBizTableData()));
        expect(gen.next().done).toBe(true);
    });

    /* 测试刷新 table 时是否正确发出请求参数（分页） */
    test('when reload table should request data with right params', () => {
        const state = {
            bizTable: {
                pagination: {
                    current: 4,
                    pageSize: 15,
                    total: 100
                }
            }
        };
        const gen = saga.onReloadBizTableData();

        expect(gen.next().value).toEqual(select(getBizTable));
        expect(gen.next(state.bizTable).value)
            .toEqual(put(actions.updateBizTableParams({
                paging: {current: 1, pageSize: state.bizTable.pagination.pageSize}
            })));
        expect(gen.next().done).toBe(true);
    });

    /* 测试获取数据 */
    test('request data, success and fail', () => {
        const state = {
            bizToolbar: {
                keywords: 'some keywords'
            },
            bizTable: {
                pagination: {
                    current: 1,
                    pageSize: 15
                }
            }
        };
        const gen = cloneableGenerator(saga.onGetBizTableData)();

        expect(gen.next().value).toEqual(select(getBizToolbar));
        expect(gen.next(state.bizToolbar).value).toEqual(select(getBizTable));
        const callEffect = gen.next(state.bizTable).value;
        expect(callEffect['CALL'].fn).toBe(api.getBizTableData);
        expect(callEffect['CALL'].args[0]).toEqual({
            keywords: 'some keywords',
            paging: {skip: 0, max: 15}
        });

        const successBranch = gen.clone();
        const successRes = {
            items: [
                {id: 1, code: '1'},
                {id: 2, code: '2'}
            ],
            total: 2
        };
        expect(successBranch.next(successRes).value).toEqual(put(actions.putBizTableDataSuccessResult(successRes)));
        expect(successBranch.next().done).toBe(true);

        const failBranch = gen.clone();
        expect(failBranch.throw(new Error('模拟产生异常')).value).toEqual(put(actions.putBizTableDataFailResult()));
        expect(failBranch.next().done).toBe(true);
    });
});