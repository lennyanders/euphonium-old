import { useState } from 'preact/hooks';
import { ArtistEntry } from '../components/artists/artistsEntry';
import { VirtualScroller } from '../components/VirtualScroller';
import classes from './Artists.module.css';

export const Artists = () => {
  const [artists, setArtists] = useState(
    window.audioData.getArtists((artists) => setArtists(artists)),
  );

  return (
    <>
      <h1 class={classes.h1}>Artists ({artists.length})</h1>
      {artists.length ? (
        <VirtualScroller rowHeight={24}>
          {artists.map((artist) => (
            <ArtistEntry key={artist.name} artist={artist} />
          ))}
        </VirtualScroller>
      ) : (
        <p>Start adding sources and listening to music!</p>
      )}
    </>
  );
};
