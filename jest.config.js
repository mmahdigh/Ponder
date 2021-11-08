'use strict';

module.exports = {
  testEnvironment: 'jest-environment-jsdom',
  setupFiles: ['<rootDir>/jest.setup.js'],
  transform: {
    '\\.jsx?$': 'babel-jest',
  },
};
