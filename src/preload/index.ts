import { contextBridge, ipcRenderer } from 'electron';
import type { Settings as AppSettings } from '../main/settings';
import type { TrackModel } from '../main/database/getTracks';

const windowActions = {
  minimize: () => ipcRenderer.send('minimize'),
  maximize: () => ipcRenderer.send('maximize'),
  unmaximize: () => ipcRenderer.send('unmaximize'),
  close: () => ipcRenderer.send('close'),
  /** Also fires initially */
  getMaximizedState: (cb: (isMaximized: boolean) => void) => {
    ipcRenderer.on('maximizedStateChanged', (_, isMaximized: boolean) => cb(isMaximized));
    return ipcRenderer.sendSync('getMaximizedState') as boolean;
  },
};
export type WindowActions = typeof windowActions;
contextBridge.exposeInMainWorld('windowActions', windowActions);

const settings = {
  addFolderToLibrary: () => ipcRenderer.send('addFolderToLibrary'),
  removeFolderFromLibrary: (folder: string) => ipcRenderer.send('removeFolderFromLibrary', folder),
  getSettings: (cb: (settings: Partial<AppSettings>) => void) => {
    ipcRenderer.on('settingsChanged', (_, settings: Partial<AppSettings>) => cb(settings));
    return ipcRenderer.sendSync('getSettings') as AppSettings;
  },
};
export type Settings = typeof settings;
contextBridge.exposeInMainWorld('settings', settings);

const audioData = {
  rebuild: () => ipcRenderer.send('rebuildAudioData'),
  getTracks: (cb: (tracks: TrackModel[]) => void) => {
    ipcRenderer.on('tracksChanged', (_, tracks: TrackModel[]) => cb(tracks));
    return ipcRenderer.sendSync('getTracks') as TrackModel[];
  },
};
export type AudioData = typeof audioData;
contextBridge.exposeInMainWorld('audioData', audioData);
