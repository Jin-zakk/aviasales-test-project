const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
  mode: 'development',
  entry: './src/index.tsx',
  devServer: {
    hot: 'only',
    historyApiFallback: true,
    port: 4000,
  },
  devtool: 'inline-cheap-module-source-map',
});
