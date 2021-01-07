const path = require('path');
const WebpackBar = require('webpackbar');
const { webpackMainEntry } = require('../utils/getEntry');
const { PROJECT_ROOT, MAIN_PATH_ROOT } = require('../utils/getPath');
const { DefinePlugin } = require('webpack');

const pkgJson = require('../../package.json');

module.exports = {
  devtool: false,
  target: 'electron-main',
  entry: webpackMainEntry,
  output: {
    path: path.resolve(PROJECT_ROOT, './dist/main'),
    globalObject: 'this',
    filename: 'main.js',
  },
  experiments: {
    topLevelAwait: true, // 支持 顶级 await
    asyncWebAssembly: true,
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: ['babel-loader'],
        exclude: [/node_modules/],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.less', '.jsx', '.ts', '.wasm'],
    // modules: [MAIN_PATH_ROOT, path.resolve(PROJECT_ROOT, './node_modules')],
    alias: {
      _main: MAIN_PATH_ROOT,
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
