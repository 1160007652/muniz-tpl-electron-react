const { ipcRenderer } = window['electron'];

const electron = {
  // 保存数据到磁盘
  downloadFile({ data, extName, fileName }): boolean {
    return ipcRenderer.sendSync('downLoadFileChange', JSON.stringify({ data, extName, fileName }));
  },
  // 打开URL
  openUrl(siteUrl: string) {
    ipcRenderer.send('openExternalChange', siteUrl);
  },
  // 重启应用
  restartApp() {
    ipcRenderer.send('appRestartChange');
  },
  // 检查更新
  checkUpdate() {
    ipcRenderer.send('checkUpdateChange');
  },
  // 系统屏幕休眠
  screenSleepChange(fn) {
    ipcRenderer.on('screenSleepChange', fn);
  },
  // 多语言切换
  appLanguageChange(locale) {
    ipcRenderer.send('appLanguageChange', locale);
  },
};

export default electron;
