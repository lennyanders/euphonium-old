import { useState } from 'preact/hooks';
import { VirtualScroller } from './VirtualScroller';
import { SongEntry } from './SongEntry';
import { RendererTrack } from '../../../main/database/getTracks';
import classes from './index.module.css';

export const AppSongs = () => {
  const [tracks, setTracks] = useState(window.audioData.getTracks((tracks) => setTracks(tracks)));

  return (
    <>
      <h1 class={classes.h1}>Songs ({tracks.length})</h1>
      {tracks.length ? (
        <VirtualScroller rowHeight={24}>
          {tracks.map((track: RendererTrack) => (
            <SongEntry key={track.path} track={track} />
          ))}
        </VirtualScroller>
      ) : (
        <p>Start adding sources and listening to music!</p>
      )}
    </>
  );
};
