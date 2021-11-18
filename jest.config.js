'use strict';

const path = require('path');

module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: [path.resolve('jest.setup.js')],
  testURL: 'https://thejimmydoreshow.libsyn.com/',
  transform: {
    '\\.jsx?$': 'babel-jest',
  },
};
