import MainWindow from '../windows/mainWindow';

class WindowManager {
  mainWindow: MainWindow;
  constructor() {
    this.mainWindow = new MainWindow();
  }

  /* Create all windows */
  createAllWindows() {
    this.mainWindow.createWindow();
  }
}
export default WindowManager;
