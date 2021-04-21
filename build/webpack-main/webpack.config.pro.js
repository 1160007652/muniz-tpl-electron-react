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
    minimizer: [
      new TerserPlugin({
        extractComments: false, // 去除 js 中的注释
        terserOptions: {
          ecma: 6,
          warnings: false,
          format: {
            comments: false,
          },
          compress: {
            drop_console: true, // 去除 console 打印
          },
          ie8: false,
        },
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
  ],
});
