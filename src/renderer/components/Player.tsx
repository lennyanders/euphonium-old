import { useState, useEffect } from 'preact/hooks';
import {
  mdiPlay,
  mdiPause,
  mdiSkipPrevious,
  mdiSkipNext,
  mdiVolumeHigh,
  mdiVolumeLow,
  mdiVolumeMedium,
} from '@mdi/js';
import { Icon } from './icon';
import { RendererTrack } from '../../main/database/getTracks';
import { getFormattedTime } from '../../shared/utils';
import classes from './Player.module.css';

const audio = new Audio();

export const Player = () => {
  const track: RendererTrack = {
    path: "file://C:/Users/lenny/Music/physical/Deadmau5/While (1[2)/Deadmau5 - Seeya (feat. Colleen D'Agostino).flac",
    artists: 'Deadmau5',
    title: "Seeya (feat. Colleen D'Agostino)",
    duration: 400,
    durationFormatted: '6:40',
  };

  const [isPlaying, setIsPlaying] = useState(() => !audio.paused);
  const [isMuted, setIsMuted] = useState(() => audio.muted);
  const [progress, setProgress] = useState(() => audio.currentTime);
  const [volume, setVolume] = useState(() => audio.volume);

  const setPlayState = () => {
    const newIsPlaying = !audio.paused;
    setIsPlaying(newIsPlaying);

    if (newIsPlaying) updateProgressState();
    else cancelUpdateProgressState();
  };
  const setMutedState = () => setIsMuted(audio.muted);
  const setProgressState = () => setProgress(audio.currentTime);
  const setVolumeState = () => setVolume(audio.volume);

  let progressAnimationFrame = 0;
  const updateProgressState = () => {
    setProgressState();
    progressAnimationFrame = requestAnimationFrame(updateProgressState);
  };
  const cancelUpdateProgressState = () => cancelAnimationFrame(progressAnimationFrame);

  const playPause = () => {
    if (isPlaying) audio.pause();
    else audio.play();
  };

  const muteUnmute = () => {
    audio.muted = !audio.muted;
  };

  const setProgressUI = (event: Event) => {
    audio.currentTime = +(event.target as HTMLInputElement).value;
    if (!isPlaying) setProgressState();
  };

  const setVolumeUI = (event: Event) => {
    audio.volume = +(event.target as HTMLInputElement).value;
  };

  useEffect(() => {
    audio.volume = 0.25;
    // audio.muted = true;
    audio.src = track.path;
    audio.currentTime = 180;

    audio.addEventListener('durationchange', () => setProgressState());

    audio.addEventListener('play', setPlayState, { passive: true });
    audio.addEventListener('pause', setPlayState, { passive: true });
    setPlayState();

    audio.addEventListener('volumechange', setMutedState, { passive: true });
    setMutedState();

    setProgressState();

    audio.addEventListener('volumechange', setVolumeState, { passive: true });
    setVolumeState();
  }, []);

  return (
    <div class={classes.player}>
      <div class={classes.progress} style={`--progress: ${(progress / track.duration) * 100}%`}>
        <div class={classes.progressValue}></div>
        <input type="range" min="0" value={progress} max={track.duration} onInput={setProgressUI} />
      </div>
      <div class={classes.info}>
        <span>{track.title}</span>
        <span>{track.artists}</span>
      </div>
      <div class={classes.controls}>
        <button>
          <Icon path={mdiSkipPrevious} />
        </button>
        <button onClick={playPause}>
          <Icon path={isPlaying ? mdiPause : mdiPlay} />
        </button>
        <button>
          <Icon path={mdiSkipNext} />
        </button>
      </div>
      <div class={classes.options}>
        <span>
          {getFormattedTime(progress)}/{track.durationFormatted}
        </span>
        <div class={classes.audio}>
          <button onClick={muteUnmute} class={isMuted ? classes.muted : ''}>
            <Icon
              path={volume < 0.25 ? mdiVolumeLow : volume > 0.75 ? mdiVolumeHigh : mdiVolumeMedium}
            />
          </button>
          <div class={classes.volume} style={`--progress: ${volume * 100}%`}>
            <input type="range" min="0" value={volume} max="1" step="0.01" onInput={setVolumeUI} />
          </div>
        </div>
      </div>
    </div>
  );
};
