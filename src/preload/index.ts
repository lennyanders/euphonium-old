import { contextBridge, ipcRenderer } from 'electron';

const windowActions = {
  minimize: () => ipcRenderer.send('minimize'),
  maximize: () => ipcRenderer.send('maximize'),
  unmaximize: () => ipcRenderer.send('unmaximize'),
  close: () => ipcRenderer.send('close'),
  /** Also fires initially */
  getMaximizedState: (cb: (isMaximized: boolean) => void) => {
    ipcRenderer.send('getMaximizedState');
    ipcRenderer.on('maximizedStateChanged', (_, isMaximized: boolean) => cb(isMaximized));
  },
};
export type WindowActions = typeof windowActions;
contextBridge.exposeInMainWorld('windowActions', windowActions);

const settings = {
  addFolderToLibrary: () => ipcRenderer.send('addFolderToLibrary'),
  removeFolderFromLibrary: (folder: string) => ipcRenderer.send('removeFolderFromLibrary', folder),
  getLibraryFolders: (cb: (folders: string[]) => void) => {
    ipcRenderer.send('getLibraryFolders');
    ipcRenderer.on('libraryFoldersChanged', (_, folders: string[]) => cb(folders));
  },
};
export type Settings = typeof settings;
contextBridge.exposeInMainWorld('settings', settings);
