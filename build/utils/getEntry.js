/**
 * @ Author: Muniz
 * @ Create Time: 2020-06-12 11:46:25
 * @ Modified by: Muniz
 * @ Modified time: 2020-06-15 11:55:46
 * @ Description: webpack 打包入口配置文件
 */

const path = require('path');
const { RENDER_PATH_ROOT, MAIN_PATH_ROOT } = require('./getPath');

// 渲染进程
const devRendererEntry = path.resolve(RENDER_PATH_ROOT, 'index.js');
const proRendererEntry = path.resolve(RENDER_PATH_ROOT, 'index.js');
const webpackRendererEntry = process.env.NODE_ENV === 'development' ? devRendererEntry : proRendererEntry;

// 主进程
const devMainEntry = path.resolve(MAIN_PATH_ROOT, 'index.js');
const proMainEntry = path.resolve(MAIN_PATH_ROOT, 'index.js');
const webpackMainEntry = process.env.NODE_ENV === 'development' ? devMainEntry : proMainEntry;

module.exports = {
  webpackRendererEntry,
  webpackMainEntry,
};
