import { BrowserWindow, Menu, app, powerMonitor } from 'electron';
import path from 'path';
import appUpdater from '../utils/appUpdater';
import i18n from 'i18next';

class MainWindow {
  public win: Electron.BrowserWindow;
  constructor(win = null) {
    /* win is this electron window instance */
    this.win = win;
  }

  initBrowserPage() {
    // Develop env not
    if (process.env.NODE_ENV === 'development') {
      this.win.webContents.openDevTools();
    }
    // loadFile page
    this.win.loadFile(path.resolve(__dirname, `../renderer/index.html`)).catch(console.error);

    this.win.on('closed', () => {
      this.win = null;
      app.quit();
      console.log('windows closed');
    });

    this.win.once('ready-to-show', () => {
      this.win.show();
    });

    powerMonitor.on('suspend', () => {
      this.win.webContents.send('lockAppChange');
    });
    powerMonitor.on('lock-screen', () => {
      this.win.webContents.send('lockAppChange');
    });
  }

  createWindow() {
    if (this.win) {
      console.warn('window is already exists!');
      return;
    }

    const win = new BrowserWindow({
      width: 1200,
      height: 900,
      minWidth: 600,
      minHeight: 450,
      autoHideMenuBar: true,
      webPreferences: {
        /* Note: these settings are related to the security of the program, please use it with caution! */
        // enableRemoteModule: false, //  Electron 10.x and above need to be actively enabled in order to use remote in the rendering process
        // nodeIntegration: true, // node integration, allow renderer process use node.js!
        preload: path.resolve(__dirname, '../../public/js/preload.js'),
      },
      icon: path.resolve(__dirname, `../../public/images/icon-16.png`),
      show: false,
      // frame: false,
    });

    this.win = win;
    this.initBrowserPage();

    this.setWindowMenu();
  }

  setWindowMenu = () => {
    if (process.env.NODE_ENV !== 'development') {
      if (process.platform === 'darwin') {
        const template: Electron.MenuItemConstructorOptions[] | Electron.MenuItem[] = [
          {
            label: i18n.t('window_main_menu_findora_app'),
            submenu: [
              {
                label: i18n.t('window_main_menu_update'),
                click: () => {
                  appUpdater.checkForUpdates();
                },
              },
              {
                role: 'quit',
                label: i18n.t('window_main_menu_quit'),
              },
            ],
          },
          {
            label: i18n.t('window_main_menu_edit'),
            submenu: [
              { role: 'selectAll', label: i18n.t('window_main_menu_select_all') },
              { role: 'undo', label: i18n.t('window_main_menu_undo') },
              { role: 'redo', label: i18n.t('window_main_menu_redo') },
              { role: 'cut', label: i18n.t('window_main_menu_cut') },
              { role: 'copy', label: i18n.t('window_main_menu_copy') },
              { role: 'paste', label: i18n.t('window_main_menu_paste') },
            ],
          },
        ];
        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
      } else {
        Menu.setApplicationMenu(null);
      }
    }
  };
}

export default MainWindow;
