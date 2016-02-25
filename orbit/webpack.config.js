/* global __dirname, module */
'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const SRC = path.resolve(__dirname, 'src');
const DIST = path.resolve(__dirname, 'dist');

module.exports = {
  entry: SRC,

  resolve: {
    extensions: ['', '.js']
  },

  output: {
    path: DIST,
    filename: 'index.js'
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
          plugins: ['transform-runtime']
        }
      }
    ]
  }
};
