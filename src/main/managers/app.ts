import path from 'path';
import { Tray, nativeImage, session } from 'electron';

import EventManager from './event';
import WindowManager from './window';
import MenuManager from './menu';
import i18n from '_src/main/utils/i18n';

class AppManager {
  windowManager: WindowManager;
  menuManager: MenuManager;
  eventManager: EventManager;
  tray: Tray;
  constructor() {
    this.windowManager = new WindowManager();
    this.menuManager = new MenuManager(this);
    this.eventManager = new EventManager(this);
  }

  /* Initialize the app, create windows and tray */
  initApp() {
    this.windowManager.createAllWindows();
    if (process.env.NODE_ENV !== 'development') {
      this.initCSP();
    }
    // this.createAppTray();
  }

  initCSP() {
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          'Content-Security-Policy': ["script-src 'self'; block-all-mixed-content"],
        },
      });
    });
  }

  languageChange(locale: string) {
    i18n.changeLanguage(locale, () => {
      // this.setAppTrayMenu();
      this.windowManager.mainWindow.setWindowMenu();
    });
  }

  /* Create app tray */
  createAppTray() {
    try {
      const iconPath = path.resolve(__dirname, `../../public/images/icon-16.png`);
      const trayIcon = nativeImage.createFromPath(iconPath);
      this.tray = new Tray(trayIcon);
      this.setAppTrayMenu();
    } catch (err) {
      console.error('Failed to create app tray, error:', err);
    }
  }

  /* Create tray menu */
  setAppTrayMenu() {
    const menu = this.menuManager.AppTrayMenu();
    this.tray.setContextMenu(menu);
  }
}

export default AppManager;
