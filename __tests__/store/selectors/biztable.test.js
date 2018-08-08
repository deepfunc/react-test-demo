import Immutable from 'seamless-immutable';
import { getBizTable } from '@/store/selectors';
import * as defaultSettingsUtil from '@/utils/defaultSettingsUtil';

/* 测试 bizTable selector */
describe('bizTable selector', () => {
    let state;

    beforeEach(() => {
        state = createState();
        getBizTable.resetRecomputations();
    });

    function createState() {
        return Immutable({
            bizTable: {
                loading: false,
                pagination: {
                    current: 1,
                    pageSize: 15,
                    total: 0
                },
                data: []
            }
        });
    }

    /* 测试返回正确的 bizTable state */
    test('should return bizTable state', () => {
        expect(getBizTable(state)).toMatchObject(state.bizTable);
        expect(getBizTable(state)).toMatchObject({
            pagination: defaultSettingsUtil.pagination
        });
    });

    /* 测试 selector 缓存是否有效 */
    test('check memoization', () => {
        getBizTable(state);
        expect(getBizTable.recomputations()).toBe(1);
        getBizTable(state);
        expect(getBizTable.recomputations()).toBe(1);
        const newState = state.setIn(['bizTable', 'loading'], true);
        getBizTable(newState);
        expect(getBizTable.recomputations()).toBe(2);
    });
});