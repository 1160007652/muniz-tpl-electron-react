/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-12 11:51:22
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-12 12:07:49
 * @ Description: 项目运行所需要的目录路径
 */
const path = require('path');
const config = require('../config');

// 项目根目录
const PROJECT_ROOT = path.resolve(__dirname, '../../');
// 项目下的 SRC 开发目录
const SRC_ROOT = path.resolve(PROJECT_ROOT, './src');
const MAIN_PATH_ROOT = path.resolve(SRC_ROOT, './main');

// 项目下的 SRC / less , 全局注入 LESS 变量样式
const RENDER_PATH_ROOT = path.resolve(SRC_ROOT, './render');
const LESS_PATH_ROOT = path.resolve(RENDER_PATH_ROOT, './assets/less');

// 热更新
const HMRSSE_Path = encodeURIComponent(`http://${config.dev.ip}:${config.dev.port}/__webpack_HMR__`);
// 将热更新路径指定为我们的devServer的地址
const HMR_CLIENT_SCRIPT = `webpack-hot-middleware/client?path=${HMRSSE_Path}&reload=true`;

module.exports = {
  PROJECT_ROOT,
  SRC_ROOT,
  LESS_PATH_ROOT,
  RENDER_PATH_ROOT,
  MAIN_PATH_ROOT,
  HMR_CLIENT_SCRIPT,
};
