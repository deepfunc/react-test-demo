import sinon from 'sinon';
import { fetcher } from '@/utils/fetcher';
import * as api from '@/services/bizApi';

/* 测试 bizApi */
describe('bizApi', () => {
    let fetcherStub;

    beforeAll(() => {
        fetcherStub = sinon.stub(fetcher);
    });

    afterEach(() => {
        const keys = Object.keys(fetcherStub);
        for(const key of keys) {
            if (fetcherStub[key].isSinonProxy) {
                fetcherStub[key].reset();
            }
        }
    });

    afterAll(() => {
        fetcherStub.restore();
    });

    /* getBizTableData api 应该调用正确的 method 和传递正确的参数 */
    test('getBizTableData api should call postJSON with right params of fetcher', () => {
        /* 模拟参数 */
        const payload = {a: 1, b: 2};
        api.getBizTableData(payload);

        /* 检查是否调用了工具库 */
        expect(fetcherStub.postJSON.callCount).toBe(1);
        /* 检查调用参数是否正确 */
        expect(fetcherStub.postJSON.lastCall.calledWith('/api/biz/get-table', payload)).toBe(true);
    });
});