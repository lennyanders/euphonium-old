import { useState } from 'preact/hooks';
import { Album } from '../components/albums/Album';
import classes from './Albums.module.css';

export const Albums = () => {
  const [albums, setAlbums] = useState(window.audioData.getAlbums((albums) => setAlbums(albums)));

  return (
    <>
      <h1 class={classes.h1}>Albums ({albums.length})</h1>
      {albums.length ? (
        <ul class={classes.albums}>
          {albums.map((album) => (
            <Album key={album.artists + album.title} album={album} />
          ))}
        </ul>
      ) : (
        <p>Start adding sources and listening to music!</p>
      )}
    </>
  );
};
