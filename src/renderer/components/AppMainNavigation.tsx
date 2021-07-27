import {
  mdiAccountMusic,
  mdiAlbum,
  mdiCog,
  mdiFolderMusic,
  mdiMusicNote,
  mdiPlaylistMusic,
} from '@mdi/js';
import { icon } from '../utils';
import classes from './AppMainNavigation.module.css';

export const AppMainNavigation = () => (
  <nav class={classes.mainNavigation}>
    <a href="#artists">{icon(mdiAccountMusic)}Artists</a>
    <a href="#albums">{icon(mdiAlbum)}Albums</a>
    <a href="#songs">{icon(mdiMusicNote)}Songs</a>
    <a href="#playlists">{icon(mdiPlaylistMusic)}Playlists</a>
    <a href="#folders">{icon(mdiFolderMusic)}Folders</a>
    <a href="#settings">{icon(mdiCog)}Settings</a>
  </nav>
);
