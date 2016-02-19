/* global __dirname, module */

import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';

const SRC = path.resolve(__dirname);
const DIST = path.resolve(__dirname, '../dist');

export default {
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
