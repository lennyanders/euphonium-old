import { contextBridge, ipcRenderer } from 'electron';
import { get } from './utils';
import type { Settings as AppSettings } from '../main/settings';
import type { Artist } from '../main/database/getArtists';
import type { Album } from '../main/database/entity/album';
import type { RendererTrack } from '../main/database/getTracks';
import { ArtistData } from '../main/database/getArtistData';

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
  getArtists: get<Artist[]>('getArtists', 'artistsChanged'),
  getArtistData: (artist: string) => ipcRenderer.sendSync('getArtistData', artist) as ArtistData,
  getAlbums: get<Album[]>('getAlbums', 'albumsChanged'),
  getTracks: get<RendererTrack[]>('getTracks', 'tracksChanged'),
};
export type AudioData = typeof audioData;
contextBridge.exposeInMainWorld('audioData', audioData);
