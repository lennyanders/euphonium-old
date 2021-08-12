import { Image } from '../components/Image';
import { SongsList } from '../components/songs/SongsList';
import classes from './Album.module.css';

export const Album = () => {
  const url = new URL(`file:///${location.hash.slice(1)}`);
  const artist = decodeURIComponent(url.searchParams.get('artist')!);
  const title = decodeURIComponent(url.searchParams.get('title')!);
  const album = window.audioData.getAlbumWithTracks(artist, title);

  console.log(album);

  return (
    <>
      <header class={classes.header}>
        {album.previewCoverPath && (
          <Image
            src={`file:///${album.previewCoverPath}`}
            alt={`${title} by ${artist}`}
            class={classes.cover}
          />
        )}
        <h1 class={classes.title}>{title}</h1>
        <span class={classes.artist}>{artist}</span>
        <div>
          <span>Disks: {album.diskCount} </span>
          <span>Tracks: {album.trackCount} </span>
          <span>Duration: {album.duration}</span>
        </div>
      </header>
      {Object.keys(album.tracks).map((disk) => {
        return (
          <section>
            <h2>Disk {disk}</h2>
            <SongsList tracks={album.tracks[+disk]} />
          </section>
        );
      })}
    </>
  );
};
