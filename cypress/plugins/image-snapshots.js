'use strict';

const { initPlugin } = require('cypress-plugin-snapshots/plugin');

module.exports = function imageSnapshotsPlugin(on, config) {
  initPlugin(on, config);
  return config;
};
