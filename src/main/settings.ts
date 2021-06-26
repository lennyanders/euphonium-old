import Store from 'electron-store';
import type { Schema } from 'electron-store';

interface Settings {
  libraryFolders: string[];
}

export const settingsStore = new Store({
  name: 'settings',
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
