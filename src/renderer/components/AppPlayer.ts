import { LitElement, html, css } from 'lit';
import { customElement, eventOptions, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map';
import {
  mdiPlay,
  mdiPause,
  mdiSkipPrevious,
  mdiSkipNext,
  mdiVolumeHigh,
  mdiVolumeLow,
  mdiVolumeMedium,
} from '@mdi/js';
import { icon } from '../utils';
import type { TrackModel } from '../../main/database/getTracks';
import { getFormattedTime } from '../../shared/utils';

const audio = new Audio();

@customElement('app-player')
export class AppMainNavigation extends LitElement {
  static styles = css`
    :host {
      display: grid;
      grid-template: 'progress progress progress' auto 'info controls options' auto / 1fr auto 1fr;
      background-color: #111;
    }

    .progress {
      grid-area: progress;
    }

    .progress input {
      margin: 0;
      width: 100%;
    }

    .info {
      grid-area: info;
      display: grid;
    }

    .controls {
      grid-area: controls;
      display: flex;
    }

    .options {
      grid-area: options;
      display: flex;
      justify-content: flex-end;
    }

    .muted {
      position: relative;
    }

    .muted::before {
      content: '';
      position: absolute;
      height: 0.125rem;
      width: 1.5rem;
      top: 50%;
      left: 50%;
      background-color: currentColor;
      box-shadow: 0 -0.125rem 0 0 #111;
      transform: translate(-50%, -50%) rotate(45deg);
    }

    button {
      background: transparent;
      padding: 1rem;
      border: 0;
    }

    svg {
      display: block;
      fill: currentColor;
      width: 1.5rem;
    }
  `;

  @state()
  private track: TrackModel = {
    path: "file://C:/Users/lenny/Music/i have on CD/Deadmau5/While (1[2)/Deadmau5 - Seeya (feat. Colleen D'Agostino).flac",
    artists: 'Deadmau5',
    title: "Seeya (feat. Colleen D'Agostino)",
    duration: 400,
    durationFormatted: '6:40',
  };

  @state()
  private isPlaying = false;

  @state()
  private isMuted = false;

  @state()
  private progress = 0;

  @state()
  private volume = 1;

  constructor() {
    super();

    audio.src = this.track.path;

    audio.addEventListener('play', this.setPlayState, { passive: true });
    audio.addEventListener('pause', this.setPlayState, { passive: true });
    this.setPlayState();

    audio.addEventListener('volumechange', this.setMutedState, { passive: true });
    this.setMutedState();

    audio.addEventListener('timeupdate', this.setProgressState, { passive: true });
    this.setProgressState();

    audio.addEventListener('volumechange', this.setVolumeState, { passive: true });
    this.setVolumeState();
  }

  private setPlayState = () => (this.isPlaying = !audio.paused);
  private setMutedState = () => (this.isMuted = audio.muted);
  private setProgressState = () => (this.progress = audio.currentTime);
  private setVolumeState = () => (this.volume = audio.volume);

  @eventOptions({ passive: true })
  private playPause() {
    if (this.isPlaying) audio.pause();
    else audio.play();
  }

  @eventOptions({ passive: true })
  private muteUnmute() {
    audio.muted = !audio.muted;
  }

  @eventOptions({ passive: true })
  private setProgress(event: Event) {
    audio.currentTime = +(<HTMLInputElement>event.target).value;
  }

  @eventOptions({ passive: true })
  private setVolume(event: Event) {
    audio.volume = +(<HTMLInputElement>event.target).value;
  }

  render() {
    return html`<div class="progress">
        <input
          type="range"
          min="0"
          .value="${this.progress.toString()}"
          max="${this.track.duration}"
          @input="${this.setProgress}"
        />
      </div>
      <div class="info">
        <span>${this.track.title}</span>
        <span>${this.track.artists}</span>
      </div>
      <div class="controls">
        <button>${icon(mdiSkipPrevious)}</button>
        <button @click="${this.playPause}">${icon(this.isPlaying ? mdiPause : mdiPlay)}</button>
        <button>${icon(mdiSkipNext)}</button>
      </div>
      <div class="options">
        <span>${getFormattedTime(this.progress)}/${this.track.durationFormatted}</span>
        <button @click="${this.muteUnmute}" class="${classMap({ muted: this.isMuted })}">
          ${icon(
            this.volume < 0.25
              ? mdiVolumeLow
              : this.volume > 0.75
              ? mdiVolumeHigh
              : mdiVolumeMedium,
          )}
        </button>
        <input
          type="range"
          min="0"
          value="${this.volume}"
          max="1"
          step="0.01"
          ?disabled="${this.isMuted}"
          @input="${this.setVolume}"
        />
      </div>`;
  }
}
