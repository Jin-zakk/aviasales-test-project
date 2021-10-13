const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const path = require('path');

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    filename: './bundle.[contenthash].min.js',
    path: path.resolve(__dirname, '../build'),
  },
  devtool: 'source-map',
});
