//Node.js
const path = require('path');

//常量
const CONTENT_PATH = path.resolve(__dirname, 'public');

//插件
const webpack = require('webpack');

//配置
const merge = require('webpack-merge');
const webpackCommonConfig = require('./webpack.common.js');

module.exports = merge(webpackCommonConfig, {
  mode: 'development',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: CONTENT_PATH,
    hot: true,
    host: '0.0.0.0',
    // historyApiFallback: true,
    proxy: {
      '/api': {
        target: '',
        pathRewrite: { '^/api': '' },
        changeOrigin: true,
      },
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
