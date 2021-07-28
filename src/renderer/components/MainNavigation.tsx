import {
  mdiAccountMusic,
  mdiAlbum,
  mdiCog,
  mdiFolderMusic,
  mdiMusicNote,
  mdiPlaylistMusic,
} from '@mdi/js';
import { Icon } from './icon';
import classes from './MainNavigation.module.css';

export const MainNavigation = () => (
  <nav class={classes.mainNavigation}>
    <a href="#artists">
      <Icon path={mdiAccountMusic} />
      Artists
    </a>
    <a href="#albums">
      <Icon path={mdiAlbum} />
      Albums
    </a>
    <a href="#songs">
      <Icon path={mdiMusicNote} />
      Songs
    </a>
    <a href="#playlists">
      <Icon path={mdiPlaylistMusic} />
      Playlists
    </a>
    <a href="#folders">
      <Icon path={mdiFolderMusic} />
      Folders
    </a>
    <a href="#settings">
      <Icon path={mdiCog} />
      Settings
    </a>
  </nav>
);
