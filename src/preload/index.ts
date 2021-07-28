import { contextBridge, ipcRenderer } from 'electron';
import { RendererTrack } from '../main/database/getTracks';
import type { Settings as AppSettings } from '../main/settings';
import { get } from './utils';

const windowActions = {
  minimize: () => ipcRenderer.send('minimize'),
  maximize: () => ipcRenderer.send('maximize'),
  unmaximize: () => ipcRenderer.send('unmaximize'),
  close: () => ipcRenderer.send('close'),
  getMaximizedState: get<boolean>('getMaximizedState', 'maximizedStateChanged'),
};
export type WindowActions = typeof windowActions;
contextBridge.exposeInMainWorld('windowActions', windowActions);

const settings = {
  addFolderToLibrary: () => ipcRenderer.send('addFolderToLibrary'),
  removeFolderFromLibrary: (folder: string) => ipcRenderer.send('removeFolderFromLibrary', folder),
  getSettings: get<AppSettings>('getSettings', 'settingsChanged'),
};
export type Settings = typeof settings;
contextBridge.exposeInMainWorld('settings', settings);

const audioData = {
  rebuild: () => ipcRenderer.send('rebuildAudioData'),
  getTracks: get<RendererTrack[]>('getTracks', 'tracksChanged'),
};
export type AudioData = typeof audioData;
contextBridge.exposeInMainWorld('audioData', audioData);
