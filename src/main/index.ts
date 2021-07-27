import { join } from 'path';
import { app, BrowserWindow, dialog, ipcMain } from 'electron';

import { isDev } from './consts';
import { Settings, settingsStore } from './settings';
import { buildData } from './database/buildData';
import { getTracks } from './database/getTracks';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    frame: false,
    show: false,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      sandbox: true,
      contextIsolation: true,
      webSecurity: !isDev, // to play local audio files
    },
  });

  if (isDev) {
    win.loadURL('http://localhost:9090/index.html#songs');
    win.webContents.openDevTools({ mode: 'detach' });
  } else {
    win.loadFile('http://localhost:9090/index.html', { hash: 'songs' });
  }

  win.once('ready-to-show', () => win.show());

  ipcMain.on('minimize', () => win.minimize());
  ipcMain.on('maximize', () => win.maximize());
  ipcMain.on('unmaximize', () => win.unmaximize());
  ipcMain.on('close', () => win.close());
  ipcMain.on('getMaximizedState', (event) => {
    const send = () => event.sender.send('maximizedStateChanged', win.isMaximized());
    win.on('maximize', send);
    win.on('minimize', send);
    win.on('unmaximize', send);
    win.on('restore', send);
    event.returnValue = win.isMaximized();

    // stop sending/listening to events when ui gets reloaded (mainly for development)
    win.webContents.once('did-start-loading', () => {
      win.off('maximize', send);
      win.off('minimize', send);
      win.off('unmaximize', send);
      win.off('restore', send);
    });
  });

  ipcMain.on('addFolderToLibrary', async () => {
    const res = await dialog.showOpenDialog(win, { properties: ['openDirectory'] });
    if (res.canceled) return;

    settingsStore.set('libraryFolders', [
      ...new Set([...settingsStore.store.libraryFolders, ...res.filePaths]),
    ]);
  });

  ipcMain.on('removeFolderFromLibrary', (_, folder: string) => {
    const folders = new Set(settingsStore.store.libraryFolders);
    folders.delete(folder);
    settingsStore.set('libraryFolders', [...folders]);
  });

  ipcMain.on('getSettings', (event) => {
    const unsubscribers = Object.keys(settingsStore.store).map((key) => {
      return settingsStore.onDidChange(<keyof Settings>key, (newValue) => {
        event.sender.send('settingsChanged', <Partial<Settings>>{ [key]: newValue });
      });
    });

    event.returnValue = settingsStore.store;

    // stop sending/listening to events when ui gets reloaded (mainly for development)
    win.webContents.once('did-start-loading', () => unsubscribers.forEach((u) => u()));
  });

  ipcMain.on('rebuildAudioData', buildData);
  ipcMain.on('getTracks', async (event) => {
    // const send = () => event.sender.send('tracksChanged', getTracks());
    event.returnValue = await getTracks();
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
