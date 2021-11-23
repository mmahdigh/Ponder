import { toTag, fromTag } from '../utils';

const originalTagPrefix = process.env.TAG_PREFIX;
beforeAll(() => {
  Object.assign(process.env, { TAG_PREFIX: 'testPonder' });
});

afterAll(() => {
  process.env.TAG_PREFIX = originalTagPrefix;
});

describe('toTag', () => {
  test('Prepends tag prefix to name', () => {
    expect(toTag('foo')).toBe('testPonder-foo');
  });
});

describe('fromTag', () => {
  test('Removes prepending prefix to name', () => {
    expect(fromTag(toTag('foo'))).toBe('foo');
  });
});
