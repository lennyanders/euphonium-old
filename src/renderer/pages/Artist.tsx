import { Album } from '../components/albums/Album';
import { SongsList } from '../components/songs/SongsList';
import classes from './Artist.module.css';

export const Artist = () => {
  const url = new URL(`file:///${location.hash.slice(1)}`);
  const artist = decodeURIComponent(url.searchParams.get('artist')!);
  const { singles, albums } = window.audioData.getArtistData(artist);

  return (
    <>
      <h1 style={{ marginTop: 0 }}>{artist || 'Unknown artist'}</h1>
      {albums.length > 0 && (
        <section>
          <h2>Albums</h2>
          <ul class={classes.albums}>
            {albums.map((album) => (
              <Album key={album.title} album={album} />
            ))}
          </ul>
        </section>
      )}
      {singles.length > 0 && (
        <section>
          <h2>Singles</h2>
          <SongsList tracks={singles} />
        </section>
      )}
    </>
  );
};
