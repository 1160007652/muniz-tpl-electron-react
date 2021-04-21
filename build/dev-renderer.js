// const webpackDev = require('./webpack-renderer/webpack.config.dev');
// module.exports = webpackDev;

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const app = express();
const webpackConfig = require('./webpack-renderer/webpack.config.dev');
// const extensionAutoReload = require('./plugin/extension-auto-reload-plugin.js');
const compiler = webpack(webpackConfig);

const config = require('./config.js');

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    headers: {
      // 配置 cors 跨域
      'Access-Control-Allow-Origin': '*',
    },
    // 将 bundle 写到磁盘而不是内存
    writeToDisk: true,
  }),
);

// 正常 热更新
app.use(webpackHotMiddleware(compiler, { path: '/__webpack_HMR__' }));

// content 模块 - 自动重启
// app.use(
//   extensionAutoReload(compiler, {
//     path: '/__webpack_electron_reload__',
//     contentScriptPath: path.resolve(__dirname, '../src/app/Contents'),
//   }),
// );

app.listen(config.dev.port, function () {
  console.log(`App listening on port ${config.dev.port} !\n`);
});
