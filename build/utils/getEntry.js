const path = require('path');
const { RENDER_PATH_ROOT, MAIN_PATH_ROOT, HMR_CLIENT_SCRIPT } = require('./getPath');

// Rendering process
const devRendererEntry = [HMR_CLIENT_SCRIPT, path.resolve(RENDER_PATH_ROOT, 'index.tsx')];
const proRendererEntry = path.resolve(RENDER_PATH_ROOT, 'index.tsx');
const webpackRendererEntry = process.env.NODE_ENV === 'development' ? devRendererEntry : proRendererEntry;

// Main process
const devMainEntry = path.resolve(MAIN_PATH_ROOT, 'index.ts');
const proMainEntry = path.resolve(MAIN_PATH_ROOT, 'index.ts');
const webpackMainEntry = process.env.NODE_ENV === 'development' ? devMainEntry : proMainEntry;

module.exports = {
  webpackRendererEntry,
  webpackMainEntry,
};
