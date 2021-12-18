//Node.js
const path = require('path');

//常量
const OUTPUT_PATH = resolvePath('dist');
const ENV_MODE = process.env.ENV_MODE;

//插件
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AutoDllPlugin = require('autodll-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const PrettierPlugin = require('prettier-webpack-plugin');

//Loader
const styleLoader = {
  loader: 'style-loader',
  options: {
    singleton: true,
  },
};

module.exports = {
  entry: {
    main: './src/main.js',
  },
  output: {
    path: OUTPUT_PATH,
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          ENV_MODE === 'dev' ? styleLoader : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: false,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [require('autoprefixer')()],
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          ENV_MODE === 'dev' ? styleLoader : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: false,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [require('autoprefixer')()],
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets',
            },
          },
        ],
      },
      {
        test: /\.js$/,
        include: resolvePath('src'),
        use: [
          'cache-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              exposeFilename: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '后台管理模板',
      template: 'src/index.html',
      inject: true,
    }),
    new CopyPlugin([{ from: 'static', to: 'assets' }]),
    new AutoDllPlugin({
      inject: true,
      debug: true,
      filename: '[name].[hash].dll.js',
      entry: {
        vendor: [
          '@babel/polyfill',
          'autoprefixer',
          'axios',
          'moment',
          'vue',
          'vue-router',
          'vue-web-storage',
          'vuex',
          'vuex-persistedstate',
        ],
      },
    }),
    new VueLoaderPlugin(),
    new ESLintPlugin(),
    new PrettierPlugin(),
    new webpack.DefinePlugin({
      ENV_MODE: JSON.stringify(ENV_MODE),
    }),
    new webpack.IgnorePlugin(/\.\/locale/, /moment/), // 打包时忽略moment语言包
    new ProgressBarPlugin(),
  ],
  performance: {
    hints: false,
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      vue: 'vue/dist/vue.esm.js',
      '@': resolvePath('src'),
      '@c': resolvePath('src/components'),
      '@v': resolvePath('src/views'),
      '@img': resolvePath('src/img'),
      '@lib': resolvePath('src/lib'),
      // '@modal': resolvePath('src/views')
    },
  },
};

// 工具
function resolvePath(url) {
  return path.resolve(__dirname, url);
}
