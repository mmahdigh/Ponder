'use strict';

const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const Html = require('html-webpack-plugin');
const MiniCssExtract = require('mini-css-extract-plugin');

const base = {
  context: path.resolve('src'),
  entry: [
    'bootstrap/dist/css/bootstrap.min.css',
    './index.jsx',
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: { sourceMap: true },
        }],
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtract.loader,
          'css-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|svg)$/,
        use: 'file-loader',
      },
      {
        test: /\.graphql$/,
        loader: 'webpack-graphql-loader',
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new Html({
      template: path.resolve('./src/template.html'),
      inject: 'head',
    }),
    new MiniCssExtract(),
  ],
};

const environments = {
  development: {
    mode: 'development',
    output: {
      publicPath: '/',
    },
    watchOptions: {
      ignored: ['node_modules/**'],
    },
    devtool: 'source-map',
    devServer: {
      compress: false,
      port: 8080,
      historyApiFallback: true,
    },
  },

  production: {
    output: {
      path: path.resolve('dist'),
      filename: 'main.[contenthash].js',
      publicPath: '/',
    },
  },
};

module.exports = function webpackConfig() {
  return merge(base, environments[process.env.NODE_ENV] || environments.production);
};