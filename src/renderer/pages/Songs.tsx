import { useState } from 'preact/hooks';
import { VirtualScroller } from '../components/VirtualScroller';
import { SongEntry } from '../components/songs/SongEntry';
import classes from './Songs.module.css';

export const Songs = () => {
  const [tracks, setTracks] = useState(window.audioData.getTracks((tracks) => setTracks(tracks)));

  return (
    <>
      <h1 class={classes.h1}>Songs ({tracks.length})</h1>
      {tracks.length ? (
        <VirtualScroller rowHeight={24}>
          {tracks.map((track) => (
            <SongEntry key={track.path} track={track} />
          ))}
        </VirtualScroller>
      ) : (
        <p>Start adding sources and listening to music!</p>
      )}
    </>
  );
};
