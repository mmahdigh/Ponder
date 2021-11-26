'use strict';

const path = require('path');

module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['cypress'],
  setupFiles: [
    'jest-environment-jsdom',
    'jest-date-mock',
  ],
  setupFilesAfterEnv: [path.resolve('jest.setup.js')],
  testRegex: '__tests__/.*\\.test\\.jsx?$',
  moduleFileExtensions: ['js', 'jsx', 'json'],
  moduleDirectories: [
    path.resolve('node_modules'),
    path.resolve('tests'),
  ],
  testURL: 'https://thejimmydoreshow.libsyn.com/',
  transform: {
    '\\.jsx?$': 'babel-jest',
  },
};
