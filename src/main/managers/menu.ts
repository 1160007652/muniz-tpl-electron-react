import { app, Menu } from 'electron';
import i18n from 'i18next';
class MenuManager {
  appManager: any;
  windowManager: any;
  constructor(appManager) {
    this.appManager = appManager;
    this.windowManager = appManager.windowManager;
  }

  AppTrayMenu() {
    // Menu template
    const template = [
      {
        key: '1',
        label: i18n.t('app_tray_menu_active'),
        click: () => {
          if (!this.windowManager.mainWindow.win) {
            this.windowManager.mainWindow.createWindow();
            this.windowManager.mainWindow.win.show();
          } else if (this.windowManager.mainWindow.win.isVisible()) {
            this.windowManager.mainWindow.win.hide();
            this.windowManager.mainWindow.win.close();
          } else {
            this.windowManager.mainWindow.win.show();
          }
        },
      },
      {
        key: '2',
        label: i18n.t('app_tray_menu_exit'),
        click: () => {
          app.exit();
        },
      },
    ];
    return Menu.buildFromTemplate(template);
  }
}

export default MenuManager;
