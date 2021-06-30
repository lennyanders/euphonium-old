import Store from 'electron-store';
import type { Schema } from 'electron-store';
import { userDataPath } from './consts';

export interface Settings {
  libraryFolders: string[];
}

export const settingsStore = new Store({
  name: 'settings',
  cwd: userDataPath,
  schema: <Schema<Settings>>{
    libraryFolders: {
      type: 'array',
      default: [],
      items: {
        type: 'string',
      },
    },
  },
});
