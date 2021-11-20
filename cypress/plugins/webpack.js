'use strict';

const webpackPreprocessor = require('@cypress/webpack-preprocessor');
const webpackConfig = require('../../webpack.config');

module.exports = function webpackPlugin(on, config) {
  on('file:preprocessor', webpackPreprocessor({
    webpackOptions: webpackConfig,
    watchOptions: {},
  }));
};
