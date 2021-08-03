import { Album as AlbumEntity } from '../../../main/database/entity/album';
import classes from './Album.module.css';

export const Album = ({ album }: { album: AlbumEntity }) => (
  <li class={classes.album}>
    <div class={classes.cover}>
      {album.previewCoverPath && (
        <img
          class={classes.coverImage}
          src={`file:///${album.previewCoverPath}`}
          alt={`${album.title} by ${album.artists}`}
          width='1'
          height='1'
        />
      )}
    </div>
    <h2 class={classes.albumTitle} title={album.title}>
      {album.title}
    </h2>
    <small class={classes.albumArtists} title={album.artists}>
      {album.artists}
    </small>
  </li>
);
