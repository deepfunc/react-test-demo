import Immutable from 'seamless-immutable';
import { getBizTable } from '@/store/selectors';
import * as defaultSettingsUtil from '@/utils/defaultSettingsUtil';

/* 测试 bizTable selector */
describe('bizTable selector', () => {

    let state;

    beforeEach(() => {
        state = createState();
        /* 每个用例执行前重置缓存计算次数 */
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
        /* 业务状态 ok 的 */
        expect(getBizTable(state)).toMatchObject(state.bizTable);

        /* 分页默认参数设置 ok 的 */
        expect(getBizTable(state)).toMatchObject({
            pagination: defaultSettingsUtil.pagination
        });
    });

    /* 测试 selector 缓存是否有效 */
    test('check memoization', () => {
        getBizTable(state);
        /* 第一次计算，缓存计算次数为 1 */
        expect(getBizTable.recomputations()).toBe(1);

        getBizTable(state);
        /* 业务状态不变的情况下，缓存计算次数应该还是 1 */
        expect(getBizTable.recomputations()).toBe(1);

        const newState = state.setIn(['bizTable', 'loading'], true);
        getBizTable(newState);
        /* 业务状态改变了，缓存计算次数应该是 2 了 */
        expect(getBizTable.recomputations()).toBe(2);
    });
});