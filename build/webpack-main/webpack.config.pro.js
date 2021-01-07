const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { EnvironmentPlugin } = require('webpack');

const base = require('./webpack.config.base');

module.exports = merge(base, {
  mode: 'production',
  externals: {},
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({ extractComments: false })],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
  ],
});
