import nock from 'nock';
import { fetcher, FetchError } from '@/utils/fetcher';

/* 测试 fetcher */
describe('fetcher', () => {

  afterEach(() => {
    nock.cleanAll();
  });

  afterAll(() => {
    nock.restore();
  });

  /* 测试 getJSON 获得正常数据 */
  test('should get success result', () => {
    nock('http://some')
      .get('/test')
      .reply(200, { success: true, result: 'hello, world' });

    return expect(fetcher.getJSON('http://some/test')).resolves.toMatch(/^hello.+$/);
  });

  /* 测试 getJSON 获得逻辑异常数据 */
  test('should get fail result', async () => {
    nock('http://some')
      .get('/test')
      .reply(200, { success: false, error: { code: 666, message: 'destroy the world' } });

    try {
      await fetcher.getJSON('http://some/test');
    } catch (error) {
      expect(error).toEqual(expect.any(FetchError));
      expect(error).toHaveProperty('detail');
      const { detail } = error;
      expect(detail.code).toBe(666);
      expect(detail.message).toMatch(/^destroy/);
    }
  });

  /* 测试 getJSON 捕获 server 大于 400 的异常状态 */
  test('should catch server status: 400+', (done) => {
    const status = 500;
    nock('http://some')
      .get('/test')
      .reply(status);

    fetcher.getJSON('http://some/test').catch((error) => {
      expect(error).toEqual(expect.any(FetchError));
      expect(error).toHaveProperty('detail');
      expect(error.detail.status).toBe(status);
      done();
    });
  });

  /* 测试 getJSON 传递正确的 headers 和 query strings */
  test('check headers and query string of getJSON()', () => {
    nock('http://some', {
      reqheaders: {
        'Accept': 'application/json',
        'authorization': 'Basic Auth'
      }
    })
      .get('/test')
      .query({ a: '123', b: 456 })
      .reply(200, { success: true, result: true });

    const headers = new Headers();
    headers.append('authorization', 'Basic Auth');
    return expect(fetcher.getJSON(
      'http://some/test', { a: '123', b: 456 }, headers)).resolves.toBe(true);
  });

  /* 测试 postJSON，类似 getJSON 的方式将以上几种情况结合起来 */
  test('check postJSON()', async () => {
    nock('http://some', {
      reqheaders: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        'authorization': 'Basic Auth'
      }
    })
      .post('/test', { a: '123', b: 456 })
      .reply(200, { success: true, result: true })
      .post('/test/nobody')
      .reply(200, { success: true, result: true });

    expect.assertions(3);
    const headers = new Headers();
    headers.append('authorization', 'Basic Auth');
    await expect(fetcher.postJSON('http://some/test', {
      a: '123',
      b: 456
    }, headers)).resolves.toBe(true);
    await expect(fetcher.postJSON('http://some/test', {
      a: '123',
      b: 456
    })).rejects.toEqual(expect.any(Error));
    await expect(fetcher.postJSON('http://some/test/nobody', undefined, headers)).resolves.toBe(true);
  });
});
