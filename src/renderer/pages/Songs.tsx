import { useState } from 'preact/hooks';
import { SongsList } from '../components/songs/SongsList';
import classes from './Songs.module.css';

export const Songs = () => {
  const [tracks, setTracks] = useState(window.audioData.getTracks((tracks) => setTracks(tracks)));

  return (
    <>
      <h1 class={classes.h1}>Songs ({tracks.length})</h1>
      <SongsList tracks={tracks} />
    </>
  );
};
