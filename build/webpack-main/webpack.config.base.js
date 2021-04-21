const path = require('path');
const WebpackBar = require('webpackbar');
const { webpackMainEntry } = require('../utils/getEntry');
const { SRC_ROOT, PROJECT_ROOT, MAIN_PATH_ROOT } = require('../utils/getPath');
const { DefinePlugin } = require('webpack');

const pkgJson = require('../../package.json');

module.exports = {
  devtool: false,
  target: 'electron-main',
  entry: webpackMainEntry,
  externals: {
    fsevents: "require('fsevents')",
  },
  output: {
    path: path.resolve(PROJECT_ROOT, './dist/main'),
    filename: 'main.js',
  },
  experiments: {
    topLevelAwait: true, // 支持 顶级 await
    syncWebAssembly: true, // 兼容 旧版 webpack-4
    // asyncWebAssembly: true
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: ['babel-loader'],
        exclude: [/node_modules/],
      },
      {
        test: /\.node$/,
        exclude: /node_modules/,
        use: 'node-loader', // node-loader处理.node文件
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.less', '.jsx', '.ts', '.wasm'],
    // modules: [MAIN_PATH_ROOT, path.resolve(PROJECT_ROOT, './node_modules')],
    alias: {
      _main: MAIN_PATH_ROOT,
      _src: SRC_ROOT,
    },
    fallback: {
      // fsevents: false,
    },
  },
  plugins: [
    new WebpackBar(),
    new DefinePlugin({
      'process.env.VERSION_APP': JSON.stringify(pkgJson.version),
    }),
  ],
  node: {
    __dirname: false,
    __filename: false,
  },
};
