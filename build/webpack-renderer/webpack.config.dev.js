const path = require('path');
const { merge } = require('webpack-merge');
const { HotModuleReplacementPlugin, EnvironmentPlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const base = require('./webpack.config.base');
// const config = require('../config');

// base.output.publicPath = `http://${config.dev.ip}:${config.dev.port}/`;
base.output.publicPath = './';

module.exports = merge(base, {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    // CleanStaleWebpackAssets is set to ensure that during subsequent hot updates, all data will not be cleared, but the data will only be cleared during the first run
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    // Support hot update
    new HotModuleReplacementPlugin(),
    // React official product fast hot update
    new ReactRefreshWebpackPlugin(),
    new EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
  ],
});
