const { contextBridge, ipcRenderer } = require('electron');

// window['electron'] = { ipcRenderer };

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer,
});
