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

const Link = ({ href, path, text }: { href: string; path: string; text: string }) => (
  <a href={href} class={classes.link}>
    <Icon path={path} />
    {text}
  </a>
);

export const MainNavigation = () => (
  <nav class={classes.root}>
    <Link href='#artists' path={mdiAccountMusic} text='Artists' />
    <Link href='#albums' path={mdiAlbum} text='Albums' />
    <Link href='#songs' path={mdiMusicNote} text='Songs' />
    <Link href='#playlists' path={mdiPlaylistMusic} text='Playlists' />
    <Link href='#folders' path={mdiFolderMusic} text='Folders' />
    <Link href='#settings' path={mdiCog} text='Settings' />
  </nav>
);
