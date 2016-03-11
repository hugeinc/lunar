/* global __dirname, module */
'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const DIST = path.resolve(__dirname, 'orbit/dist');

const env = process.env.WEBPACK_ENV;

module.exports = {
  context: __dirname + '/orbit/src',
  entry: {
    orbit: './index.js'
  },

  resolve: {
    extensions: ['', '.js']
  },

  output: {
    path: DIST,
    filename: env === 'dist' ? 'orbit.min.js' : 'orbit.js',
    libraryTarget: 'umd',
    library: 'Orbit',
    umdNamedDefine: true
  },

  devtool: 'eval-source-map',

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|dist)/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'stage-2'],
          plugins: ['transform-runtime', 'add-module-exports', 'transform-es2015-modules-commonjs']
        }
      }
    ]
  }
};
