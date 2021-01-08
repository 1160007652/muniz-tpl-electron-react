const { spawn } = require('child_process');
const chalk = require('chalk');

module.exports = class WebpackElectronReloadPlugin {
  constructor(options) {
    this.options = options;
    this.electronProcess = null;
  }
  apply(compiler) {
    const { runScript } = this.options;
    compiler.hooks.afterEmit.tap('WebpackElectronReloadPlugin', (compilation) => {
      // 进程对象不为空，结束进程
      if (this.electronProcess && this.electronProcess.pid) {
        // 杀掉electronProcess进程
        process.kill(this.electronProcess.pid);
      }

      // 重启 electron 进程、应用
      this.electronProcess = spawn('npm', ['run', runScript], {
        shell: true,
        env: process.env,
        stdio: 'inherit',
      })
        .on('close', (code) => {
          // process.exit(code);
        })
        .on('error', (data) => {
          console.log(chalk.red(data.toString()));
        });

      console.log('sssssss=>', this.electronProcess.pid);
    });
  }
};
