import { clear } from 'jest-date-mock';

afterEach(() => {
  clear();
  jest.clearAllMocks();
});
