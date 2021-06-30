import { contextBridge, ipcRenderer } from 'electron';
import type * as Tables from '../main/database/Tables';

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

const audioData = {
  rebuild: () => ipcRenderer.send('rebuildAudioData'),
  getTracks: (
    cb: (tracks: Pick<Tables.track, 'path' | 'artists' | 'title' | 'duration'>[]) => void,
  ) => {
    ipcRenderer.on(
      'tracksChanged',
      (_, tracks: Pick<Tables.track, 'path' | 'artists' | 'title' | 'duration'>[]) => cb(tracks),
    );
    return ipcRenderer.sendSync('getTracks') as Pick<
      Tables.track,
      'path' | 'artists' | 'title' | 'duration'
    >[];
  },
};
export type AudioData = typeof audioData;
contextBridge.exposeInMainWorld('audioData', audioData);
