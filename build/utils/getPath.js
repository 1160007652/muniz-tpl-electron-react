const path = require('path');
const config = require('../config');

// Project root directory
const PROJECT_ROOT = path.resolve(__dirname, '../../');
// SRC development directory under the project
const SRC_ROOT = path.resolve(PROJECT_ROOT, './src');
const MAIN_PATH_ROOT = path.resolve(SRC_ROOT, './main');

// SRC / less under the project, inject the LESS variable style globally
const RENDER_PATH_ROOT = path.resolve(SRC_ROOT, './render');
const LESS_PATH_ROOT = path.resolve(RENDER_PATH_ROOT, './assets/less');

// Hot update
const HMRSSE_Path = encodeURIComponent(`http://${config.dev.ip}:${config.dev.port}/__webpack_HMR__`);
// Specify the hot update path as the address of our devServer
const HMR_CLIENT_SCRIPT = `webpack-hot-middleware/client?path=${HMRSSE_Path}&reload=true`;

module.exports = {
  PROJECT_ROOT,
  SRC_ROOT,
  LESS_PATH_ROOT,
  RENDER_PATH_ROOT,
  MAIN_PATH_ROOT,
  HMR_CLIENT_SCRIPT,
};
