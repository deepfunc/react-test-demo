import * as type from '@/store/types/bizToolbar';
import reducer, { defaultState } from '@/store/reducers/bizToolbar';

/* 测试 bizToolbar reducer */
describe('bizToolbar reducer', () => {

    /* 测试未指定 state 参数情况下返回缺省 state */
    test('should return the default state', () => {
        expect(reducer(undefined, {type: 'UNKNOWN'})).toEqual(defaultState);
    });

    /* 测试更新关键字 */
    test('should handle update keywords', () => {
        const keywords = 'some keywords';
        const expectedState = defaultState.set('keywords', keywords);

        expect(
            reducer(defaultState, {
                type: type.BIZ_TOOLBAR_KEYWORDS_UPDATE,
                payload: keywords
            })
        ).toEqual(expectedState);
    });
});