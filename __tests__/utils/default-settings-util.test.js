import * as defaultSettingsUtil from '@/utils/defaultSettingsUtil';

describe('default settings utils', () => {
    test('check default pagination', () => {
        const pagination = Object.assign({}, defaultSettingsUtil.pagination);

        expect(pagination.showTotal(100, [1, 5])).toBe('1-5 / 100');
    });
});