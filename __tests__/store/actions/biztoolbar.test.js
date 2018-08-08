import * as type from '@/store/types/bizToolbar';
import * as actions from '@/store/actions/bizToolbar';

/* 测试 bizToolbar 相关 actions */
describe('bizToolbar actions', () => {
    /* 测试更新搜索关键字 */
    test('should create an action for update keywords', () => {
        // 构建目标 action
        const keywords = 'some keywords';
        const expectedAction = {
            type: type.BIZ_TOOLBAR_KEYWORDS_UPDATE,
            payload: keywords
        };

        // 断言 redux-actions 产生的 action 是否正确
        expect(actions.updateKeywords(keywords)).toEqual(expectedAction);
    });

    /* 测试刷新 */
    test('should create an action for reload', () => {
        const expectedAction = {type: type.BIZ_TOOLBAR_RELOAD};

        expect(actions.reload()).toEqual(expectedAction);
    });
});