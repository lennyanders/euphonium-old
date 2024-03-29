import { contextBridge, ipcRenderer } from 'electron';
import { get } from './utils';
import type { MenuKey } from '../main/contextMenu';
import type { Settings as AppSettings } from '../main/settings';
import type { Artist } from '../main/database/getArtists';
import type { Album } from '../main/database/entity/album';
import type { RendererTrack } from '../main/database/getTracks';
import type { ArtistData } from '../main/database/getArtistData';
import { AlbumWithTracks } from '../main/database/getAlbumWithTracks';

const windowActions = {
  minimize: () => ipcRenderer.send('minimize'),
  maximize: () => ipcRenderer.send('maximize'),
  unmaximize: () => ipcRenderer.send('unmaximize'),
  close: () => ipcRenderer.send('close'),
  showContextMenu: (menu: MenuKey) => ipcRenderer.send('showContextMenu', menu),
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
  getAlbumWithTracks: (artist: string, title: string) => {
    return ipcRenderer.sendSync('getAlbumWithTracks', artist, title) as AlbumWithTracks;
  },
  getAlbums: get<Album[]>('getAlbums', 'albumsChanged'),
  getTracks: get<RendererTrack[]>('getTracks', 'tracksChanged'),
};
export type AudioData = typeof audioData;
contextBridge.exposeInMainWorld('audioData', audioData);
