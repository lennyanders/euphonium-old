import { Album as AlbumEntity } from '../../../main/database/entity/album';
import { Image } from '../Image';
import classes from './Album.module.css';

export const Album = ({ album }: { album: AlbumEntity }) => (
  <li class={classes.album}>
    <div class={classes.cover}>
      {album.previewCoverPath && (
        <Image
          src={`file:///${album.previewCoverPath}`}
          alt={`${album.title} by ${album.artists}`}
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
