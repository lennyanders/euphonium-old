import { join } from 'path';
import { app, BrowserWindow, dialog, ipcMain } from 'electron';

import { isDev } from './consts';
import { Settings, settingsStore } from './settings';
import { buildData } from './database/buildData';
import { getArtists } from './database/getArtists';
import { getAlbums } from './database/getAlbums';
import { getTracks } from './database/getTracks';
import { getArtistData } from './database/getArtistData';
import { handleContextMenus } from './contextMenu';

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
    win.loadFile(join(__dirname, 'index.html'), { hash: 'songs' });
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
    Object.keys(settingsStore.store).map((key) => {
      return settingsStore.onDidChange(<keyof Settings>key, (newValue) => {
        event.sender.send('settingsChanged', <Partial<Settings>>{ [key]: newValue });
      });
    });

    event.returnValue = settingsStore.store;
  });

  ipcMain.on('rebuildAudioData', buildData);
  ipcMain.on('getArtists', async (event) => {
    event.returnValue = await getArtists();
  });
  ipcMain.on('getArtistData', async (event, artist: string) => {
    event.returnValue = await getArtistData(artist);
  });
  ipcMain.on('getAlbums', async (event) => {
    event.returnValue = await getAlbums();
  });
  ipcMain.on('getTracks', async (event) => {
    event.returnValue = await getTracks();
  });

  handleContextMenus();
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
