const path = require('path');
const WebpackBar = require('webpackbar');
const { webpackMainEntry } = require('../utils/getEntry');
const { PROJECT_ROOT, MAIN_PATH_ROOT, SRC_ROOT } = require('../utils/getPath');

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
    topLevelAwait: true, // Support top await
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
        test: /\.node$/,
        exclude: /node_modules/,
        use: 'node-loader', // node-loader processes .node files
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
