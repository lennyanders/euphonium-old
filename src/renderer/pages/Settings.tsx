import { useState } from 'preact/hooks';
import { mdiReload } from '@mdi/js';
import { Icon } from '../components/icon';
import { SettingsLibraryEntry } from '../components/settings/SettingsLibraryEntry';
import classes from './Settings.module.css';

export const Settings = () => {
  const [settings, setSettings] = useState(
    window.settings.getSettings((settings) => setSettings(settings)),
  );

  return (
    <>
      <h1 class={classes.h1}>Settings</h1>
      <h2>Audio Sources</h2>
      <button onClick={window.settings.addFolderToLibrary}>Add</button>
      <button onClick={window.audioData.rebuild}>
        <Icon path={mdiReload} />
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
