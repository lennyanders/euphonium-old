import { useState } from 'preact/hooks';
import { mdiReload } from '@mdi/js';
import { icon } from '../../utils';
import { SettingsLibraryEntry } from './SettingsLibraryEntry';
import classes from './index.module.css';

export const AppSettings = () => {
  const [settings, setSettings] = useState(
    window.settings.getSettings((settingsChanges) => {
      setSettings({ ...settings, ...settingsChanges });
    }),
  );

  return (
    <>
      <h1 class={classes.h1}>Settings</h1>
      <h2>Audio Sources</h2>
      <button onClick={window.settings.addFolderToLibrary}>Add</button>
      <button onClick={window.audioData.rebuild} class={classes.icon}>
        {icon(mdiReload)}
      </button>
      {settings.libraryFolders.length ? (
        <ul class={classes.list}>
          {settings.libraryFolders.map((folder) => (
            <SettingsLibraryEntry folder={folder} />
          ))}
        </ul>
      ) : (
        <p>Start adding sources and listening to music!</p>
      )}
    </>
  );
};
