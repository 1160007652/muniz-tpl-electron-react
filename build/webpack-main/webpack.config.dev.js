const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { EnvironmentPlugin } = require('webpack');

const base = require('./webpack.config.base');

// const { RENDER_PATH_ROOT } = require('../utils/getPath');

module.exports = merge(base, {
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
  ],
});
