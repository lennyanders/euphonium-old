import { SongsList } from '../components/songs/SongsList';

export const Artist = () => {
  const url = new URL(`file:///${location.hash.slice(1)}`);
  const artist = decodeURIComponent(url.searchParams.get('artist')!);
  const { singles, albums } = window.audioData.getArtistData(artist);

  console.log(artist);
  console.log({ singles, albums });

  return (
    <>
      <h1 style={{ marginTop: 0 }}>{artist || 'Unknown artist'}</h1>
      {albums.length > 0 && (
        <section>
          <h2>Albums</h2>
          <ul>
            {albums.map((album) => (
              <li key={album.title}>{album.title}</li>
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
