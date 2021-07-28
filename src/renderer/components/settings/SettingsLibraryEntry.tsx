import { mdiClose } from '@mdi/js';
import { Icon } from '../icon';
import classes from './SettingsLibraryEntry.module.css';

export const SettingsLibraryEntry = ({ folder }: { folder: string }) => (
  <li class={classes.folder}>
    {folder}
    <button onClick={() => window.settings.removeFolderFromLibrary(folder)}>
      <Icon path={mdiClose} />
    </button>
  </li>
);
