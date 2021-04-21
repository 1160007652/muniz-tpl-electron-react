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
      // The process object is not empty, end the process
      if (this.electronProcess && this.electronProcess.pid) {
        // Kill the electronProcess process
        process.kill(this.electronProcess.pid);
      }

      // Restart electron process and application
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
