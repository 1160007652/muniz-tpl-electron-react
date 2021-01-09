const config = require('../../build/config');
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

// 创建全局变量并在下面引用，避免被GC
let win;

function createWindow() {
  // 创建浏览器窗口并设置宽高
  win = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: 'white',
    webPreferences: {
      nodeIntegration: true,
    },
  });
  console.log('环境===', process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'production') {
    win.loadFile(path.resolve(__dirname, `../renderer/index.html`)).catch(console.error);
  } else {
    // 加载页面
    win.loadURL(`http://${config.dev.ip}:${config.dev.port}/`).catch(console.error);
  }

  // 打开开发者工具
  win.webContents.openDevTools();
  console.log('test - 123');
  // 添加window关闭触发事件

  win.on('closed', () => {
    win = null; // 取消引用
  });
}

// 初始化后 调用函数
app.on('ready', createWindow);

// 当全部窗口关闭时退出。
app.on('window-all-closed', () => {
  // 在 macOS 上，除非用户用 Cmd + Q 确定地退出，
  // 否则绝大部分应用及其菜单栏会保持激活。
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // 在macOS上，当单击dock图标并且没有其他窗口打开时，
  // 通常在应用程序中重新创建一个窗口。
  if (win === null) {
    createWindow();
  }
});

let newWin;
ipcMain.on('openWindow', function () {
  console.log('打开窗口-123');
  //调用 BrowserWindow打开新窗口
  newWin = new BrowserWindow({
    width: 400,
    height: 300,
    show: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  newWin.loadURL('http://www.baidu.com');

  newWin.on('closed', () => {
    newWin = null;
  });
});
