import { useState } from 'preact/hooks';
// @ts-ignore
import ScrollViewport from 'preact-scroll-viewport/dist/preact-scroll-viewport.min.js';
import { SongEntry } from './SongEntry';
import { RendererTrack } from '../../../main/database/getTracks';
import classes from './index.module.css';

export const AppSongs = () => {
  const [tracks, setTracks] = useState(window.audioData.getTracks((tracks) => setTracks(tracks)));

  return (
    <>
      <h1 class={classes.h1}>Songs ({tracks.length})</h1>
      {tracks.length ? (
        <ul>
          <ScrollViewport data={tracks} rowHeight={24}>
            {tracks.map((track: RendererTrack) => (
              <SongEntry key={track.path} track={track} />
            ))}
          </ScrollViewport>
        </ul>
      ) : (
        <p>Start adding sources and listening to music!</p>
      )}
    </>
  );
};
