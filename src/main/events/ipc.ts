import { app, ipcMain, dialog, shell } from 'electron';
import appUpdater from '../utils/appUpdater';
import fs from 'fs';
class IpcEvents {
  appManager: any;
  create(appManager) {
    this.appManager = appManager;

    // language change event
    ipcMain.on('appLanguageChange', (sys, lang) => {
      this.appManager.languageChange(lang);
    });

    // openExternal change event
    ipcMain.on('openExternalChange', (sys, siteUrl) => {
      shell.openExternal(siteUrl);
    });

    // Check for Updates
    ipcMain.on('checkUpdateChange', (sys, _) => {
      appUpdater.checkForUpdates();
    });

    // Restart App change event
    ipcMain.on('appRestartChange', (sys, _) => {
      app.relaunch();
      app.quit();
    });

    // Download File change event
    ipcMain.on('downLoadFileChange', (sys, config) => {
      try {
        const { data, fileName, extName } = JSON.parse(config);

        const savefilePath = dialog.showSaveDialogSync({
          defaultPath: fileName + extName,
          nameFieldLabel: 'File Name',
          showsTagField: false,
          properties: ['showHiddenFiles'],
        });

        fs.writeFileSync(savefilePath, JSON.stringify(data), 'utf8');

        sys.returnValue = true;
      } catch (_) {
        sys.returnValue = false;
      }
    });
  }
}

export default new IpcEvents();
