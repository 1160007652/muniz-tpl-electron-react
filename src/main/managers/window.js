import MainWindow from '../windows/mainWindow';

class WindowManager {
  constructor() {
    this.mainWindow = new MainWindow();
  }

  /* Create all windows */
  createAllWindows() {
    this.mainWindow.createWindow();
  }
}
export default WindowManager;
