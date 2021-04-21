const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { EnvironmentPlugin } = require('webpack');
const ElectronReloadPlugin = require('../plugin/webpack-electron-reload-plugin.js');

const base = require('./webpack.config.base');

module.exports = merge(base, {
  devtool: 'source-map',
  mode: 'development',
  watch: true,
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
    new ElectronReloadPlugin({ runScript: 'start-main' }),
  ],
});
