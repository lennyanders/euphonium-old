import { useState } from 'preact/hooks';
import { Album as AlbumEntity } from '../../../main/database/entity/album';
import classes from './Album.module.css';

const Cover = ({ album }: { album: AlbumEntity }) => {
  if (!album.previewCoverPath) return <div class={classes.cover} />;

  const [showCover, setShowCover] = useState(false);
  const image = new Image(1, 1);
  image.src = album.previewCoverPath;
  image.decode().then(() => setShowCover(true));

  return (
    <div class={classes.cover}>
      {showCover && (
        <img
          class={classes.coverImage}
          src={`file:///${album.previewCoverPath}`}
          alt={`${album.title} by ${album.artists}`}
          width='1'
          height='1'
        />
      )}
    </div>
  );
};

export const Album = ({ album }: { album: AlbumEntity }) => (
  <li class={classes.album}>
    <Cover album={album} />
    <h2 class={classes.albumTitle} title={album.title}>
      {album.title}
    </h2>
    <small class={classes.albumArtists} title={album.artists}>
      {album.artists}
    </small>
  </li>
);
