'use strict';

/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable max-len */
/* eslint-disable no-use-before-define */

module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  extends: ['airbnb'],
  env: {
    browser: true,
  },
  rules: {
    'arrow-parens': [2, 'as-needed'],
    'react/jsx-props-no-spreading': 0,
    'react/jsx-one-expression-per-line': 0,
    'import/prefer-default-export': 0,
    'react/jsx-no-bind': 0,
    'react/static-property-placement': [2, 'static public field'],
    'consistent-return': 0,
    'no-console': 0,
  },
  overrides: [
    {
      files: [
        '.eslintrc.js',
        'babel.config.js',
        'webpack.config.js',
        'jest.config.js',
        'seeders/**/*.js',
        'cypress/plugins/**/*',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      rules: {
        strict: [2, 'global'],
        'import/no-extraneous-dependencies': [2, { devDependencies: true }],
      },
    },
    {
      files: [
        'cypress/support/commands.js',
      ],
      rules: {
        'import/no-extraneous-dependencies': [2, { devDependencies: true }],
      },
    },
    {
      files: [
        '**/*.test.js',
        '**/*.test.jsx',
        './tests/**/*',
        '**/__mocks__/**/*.js',
        'jest.setup.js',
      ],
      plugins: ['jest'],
      env: {
        jest: true,
      },
    },
    {
      files: ['cypress/**/*'],
      plugins: ['cypress'],
      env: {
        'cypress/globals': true,
      },
    },
    {
      files: ['src/components/cytoscape/cytoscape/**/*.js'],
      rules: {
        'no-underscore-dangle': 0,
      },
    },
  ],
};
