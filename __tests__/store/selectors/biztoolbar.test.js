import Immutable from 'seamless-immutable';
import { getBizToolbar } from '@/store/selectors';

/* 测试 bizToolbar selector */
describe('bizToolbar selector', () => {

  const state = Immutable({
    bizToolbar: {
      keywords: 'some keywords'
    }
  });

  /* 测试返回正确的 bizToolbar state */
  test('should return bizToolbar state', () => {
    expect(getBizToolbar(state)).toEqual(state.bizToolbar);
  });
});
