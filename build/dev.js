const waitOn = require('wait-on');
const { spawn, execSync } = require('child_process');
const config = require('./config');
const webpackDev = require('./webpack/webpack.config.dev');

const opts = {
  resources: [`http://${config.dev.ip}:${config.dev.port}/`],
  delay: 5000, // 初始延迟，默认为0
  interval: 1000, // 轮询间隔，单位为ms，默认为250ms
  simultaneous: 1, // 每个资源在同一时间限制1个连接
  timeout: 30000, // 超时单位为ms，默认为无限
  tcpTimeout: 1000, //  tcp超时时间，默认为300ms
  window: 1000, // 稳定时间，以毫秒为单位，默认为750ms
};

waitOn(opts)
  .then(() => {
    console.log('正在启动主进程...');
    spawn('npm', ['run', 'start:main'], {
      shell: true,
      env: process.env,
      stdio: 'inherit',
    })
      .on('close', (code) => process.exit(code))
      .on('error', (spawnError) => {
        process.exit(-1);
        // console.error(spawnError.message);
      });
  })
  .catch((err) => {
    console.log('主进程启动失败...');
  });

module.exports = webpackDev;
