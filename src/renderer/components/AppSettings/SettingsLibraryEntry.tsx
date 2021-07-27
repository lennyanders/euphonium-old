import { mdiClose } from '@mdi/js';
import { icon } from '../../utils';
import classes from './SettingsLibraryEntry.module.css';

export const SettingsLibraryEntry = ({ folder }: { folder: string }) => (
  <li class={classes.folder}>
    {folder}
    <button onClick={() => window.settings.removeFolderFromLibrary(folder)}>
      {icon(mdiClose)}
    </button>
  </li>
);
