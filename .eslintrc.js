'use strict';

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
        'seeder.js',
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
        '**/*.test.js',
        '**/*.test.jsx',
        './tests/**/*',
      ],
      plugins: ['jest'],
      env: {
        jest: true,
      },
    },
  ],
};
