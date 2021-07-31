import { useState } from 'preact/hooks';
import classes from './Albums.module.css';

export const Albums = () => {
  const [albums, setAlbums] = useState(window.audioData.getAlbums((albums) => setAlbums(albums)));

  return (
    <>
      <h1 class={classes.h1}>Albums ({albums.length})</h1>
      {albums.length ? (
        <ul class={classes.albums}>
          {albums.map((album) => (
            <li key={album.artists + album.title} class={classes.album}>
              <div class={classes.cover}>
                {album.previewCoverPath && (
                  <img
                    src={`file:///${album.previewCoverPath}`}
                    alt={`${album.title} by ${album.artists}`}
                    loading='lazy'
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
          ))}
        </ul>
      ) : (
        <p>Start adding sources and listening to music!</p>
      )}
    </>
  );
};
