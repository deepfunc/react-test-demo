import { put } from 'redux-saga/effects';
import * as saga from '@/store/sagas/bizToolbar';
import * as bizTableActions from '@/store/actions/bizTable';

/* 测试 bizToolbar saga */
describe('bizToolbar saga', () => {

    /* 测试 bizToolbar 业务流入口 */
    test('should watch bizToolbar flow', () => {
        const gen = saga.watchBizToolbarFlow();

        expect(gen.next().value['ALL']).toHaveLength(2);
        expect(gen.next().done).toBe(true);
    });

    /* 测试点击刷新按钮时是否触发 bizTable 刷新 */
    test('when click reload button should reload bizTable', () => {
        const gen = saga.onReload();

        expect(gen.next().value).toEqual(put(bizTableActions.reloadBizTableData()));
        expect(gen.next().done).toBe(true);
    });

    /* 测试更新关键字后是否触发 bizTable 刷新 */
    test('when update keywords should reload bizTable', () => {
        const gen = saga.onUpdateKeywords();

        expect(gen.next().value).toEqual(put(bizTableActions.reloadBizTableData()));
        expect(gen.next().done).toBe(true);
    });
});