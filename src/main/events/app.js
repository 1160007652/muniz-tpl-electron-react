import { app } from 'electron';
class AppEvents {
  create(appManager) {
    this.appManager = appManager;
    this.windowManager = appManager.windowManager;
    this.shouldQuit = app.requestSingleInstanceLock();

    app.on('activate', () => {
      if (this.windowManager.mainWindow.win) {
        this.windowManager.mainWindow.win.show();
      } else {
        this.windowManager = appManager.windowManager;
      }
    });

    /* Before electron app is ready, we should initial */
    app.on('ready', async () => {
      appManager.initApp();
    });

    /* Do something before we quit */
    app.on('before-quit', () => {
      if (appManager?.tray) {
        appManager.tray.destroy();
      }
    });

    // windows all closed
    app.on('window-all-closed', () => {
      if (process.platform === 'darwin') {
        return;
      }
    });

    if (process.env.NODE_ENV !== 'development') {
      if (!this.shouldQuit) {
        app.quit();
      } else {
        app.on('second-instance', (event, commandLine, workingDirectory) => {
          // 当运行第二个实例时,将会聚焦到myWindow这个窗口
          if (this.windowManager.mainWindow.win) {
            if (this.windowManager.mainWindow.win.isMinimized()) this.windowManager.mainWindow.win.restore();
            this.windowManager.mainWindow.win.focus();
          }
        });
      }
    }
  }
}

export default new AppEvents();
