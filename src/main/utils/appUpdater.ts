const log = require('electron-log');
const { dialog, shell, app } = require('electron');
const { autoUpdater } = require('electron-updater');
import i18n from '_src/main/utils/i18n';

class AppUpdater {
  constructor() {
    autoUpdater.autoDownload = false;
    autoUpdater.allowDowngrade = false;

    autoUpdater.logger = log;
    autoUpdater.logger.transports.file.level = 'info';

    // 设置更新链接，存放有 update.xml 的链接
    autoUpdater.setFeedURL('https://www.baidu.com');

    // 即将进行更新
    autoUpdater.on('update-available', (info) => {
      dialog
        .showMessageBox(
          {
            type: 'info',
            title: i18n.t('update_title'),
            message: i18n.t('update_info'),
            buttons: [i18n.t('confirm'), i18n.t('cancel')],
          },
          function (index) {
            console.log(index);
          },
        )
        .then((result) => {
          let buttonIndex = result.response;

          // if buttonIndex is 0 , start downloading the update
          if (buttonIndex === 0) {
            shell.openExternal('https://www.baidu.com');

            // autoUpdater.downloadUpdate();
          }
        });
    });
    /*
      autoUpdater.on('update-downloaded', () => {
        dialog
          .showMessageBox({
            type: 'info',
            title: 'Update Ready',
            message: `Install and restart now?`,
            buttons: ['Yes', 'Later'],
          })
          .then((result) => {
            let buttonIndex = result.response;

            // if buttonIndex is 0 , then install and relaunch
            if (buttonIndex === 0) {
              autoUpdater.quitAndInstall(false, true);
            }
          });
      });
    */
    // 已是最新版
    autoUpdater.on('update-not-available', (info) => {
      dialog.showMessageBox(
        {
          type: 'info',
          title: 'update',
          message: `Already the latest version`,
          buttons: [i18n.t('ok')],
        },
        function (index) {
          console.log(index);
        },
      );
    });
  }

  checkForUpdates() {
    autoUpdater.checkForUpdates();
  }
}

export default new AppUpdater();
