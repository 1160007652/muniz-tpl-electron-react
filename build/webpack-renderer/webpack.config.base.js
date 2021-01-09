const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const WebpackBar = require('webpackbar');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');

const { webpackRendererEntry } = require('../utils/getEntry');
const { PROJECT_ROOT, RENDER_PATH_ROOT, LESS_PATH_ROOT } = require('../utils/getPath');

const pkgJson = require('../../package.json');

const config = require('../config');

module.exports = {
  entry: webpackRendererEntry,
  output: {
    path: path.resolve(PROJECT_ROOT, 'dist/renderer'),
    globalObject: 'this',
    chunkFilename: 'async/js/[name].js',
    filename: 'js/[name].js',
  },
  experiments: {
    // outputModule: true,
    // syncWebAssembly: true, 兼容 旧版 webpack-4
    topLevelAwait: true, // 支持 顶级 await
    asyncWebAssembly: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: ['babel-loader'],
        exclude: [/node_modules/],
      },
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
      },
      {
        test: /\.worker\.ts$/,
        use: [
          {
            loader: 'worker-loader',
            options: { inline: true },
          },
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              sourceMap: process.env.NODE_ENV === 'development',
              lessOptions: {
                javascriptEnabled: true,
                modifyVars: config.theme,
              },
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [path.resolve(LESS_PATH_ROOT, 'less-var.less')],
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: [/\.(woff(2)?|eot|ttf|otf|svg)$/],
        type: 'asset/inline',
      },
      {
        test: [/\.(ico|png|jpe?g|gif)$/],
        type: 'asset/resource',
        generator: {
          filename: 'images/[name]-[hash:7][ext][query]',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.wasm'],
    modules: [RENDER_PATH_ROOT, path.resolve(PROJECT_ROOT, './node_modules')],
    alias: {
      _render: RENDER_PATH_ROOT,
      _components: path.resolve(RENDER_PATH_ROOT, './components/'),
      _containers: path.resolve(RENDER_PATH_ROOT, './containers/'),
      _constants: path.resolve(RENDER_PATH_ROOT, './constants/'),
      _utils: path.resolve(RENDER_PATH_ROOT, './utils'),
      _assets: path.resolve(RENDER_PATH_ROOT, './assets'),
    },
  },
  plugins: [
    new WebpackBar(),
    new FriendlyErrorsWebpackPlugin(),
    new AntdDayjsWebpackPlugin(),
    new CopyWebpackPlugin({ patterns: [{ from: 'public/images/', to: 'images' }] }),
    new HtmlWebpackPlugin({
      template: path.resolve(PROJECT_ROOT, './public/index.html'),
      filename: 'index.html',
      title: 'Muniz-Tpl-React',
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'async/css/[name].css',
      ignoreOrder: false,
    }),
    new DefinePlugin({
      'process.env.VERSION_APP': JSON.stringify(pkgJson.version),
    }),
  ],
};
