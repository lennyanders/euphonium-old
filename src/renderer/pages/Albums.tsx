import { useState } from 'preact/hooks';
import classes from './Albums.module.css';

export const Albums = () => {
  const [albums, setAlbums] = useState(window.audioData.getAlbums((albums) => setAlbums(albums)));

  console.log(albums);

  return (
    <>
      <h1 class={classes.h1}>Albums ({albums.length})</h1>
      {albums.length ? (
        <ul>
          {albums.map((album) => (
            <li>
              {album.title} by {album.artists}
              <br />
            </li>
          ))}
        </ul>
      ) : (
        <p>Start adding sources and listening to music!</p>
      )}
    </>
  );
};
