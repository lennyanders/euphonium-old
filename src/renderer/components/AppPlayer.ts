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
      position: relative;
    }

    .progress__value {
      height: 0.5rem;
      width: 100%;
      background-color: #2962ff;
      transform: translateX(calc(-100% + var(--progress)));
    }

    .progress__value::after {
      content: '';
      position: absolute;
      right: -0.25rem;
      height: 0.5rem;
      width: 0.5rem;
      border-radius: 50%;
      background-color: inherit;
      transition: transform 0.2s ease;
    }

    .progress:hover .progress__value::after {
      transform: scale(1.75);
    }

    .progress input {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      opacity: 0;
      z-index: 1;
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
      align-items: center;
    }

    .audio {
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

    .volume {
      --width: 0.5rem;
      --height: 10rem;
      position: absolute;
      bottom: 100%;
      margin-bottom: 1.5rem;
      right: 50%;
      margin-right: -0.75rem;
      border-radius: 0.25rem;
      width: var(--width);
      height: var(--height);
      padding: 0.75rem;
      background-color: #111;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.2s 0.25s ease, visibility 0.2s 0.25s;
    }

    .audio:hover .volume {
      transition: opacity 0.2s 0s ease, visibility 0.2s 0s;
      opacity: 1;
      visibility: visible;
    }

    .volume::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -0.5rem;
      border-top: 0.5rem solid #111;
      border-left: 0.5rem solid transparent;
      border-right: 0.5rem solid transparent;
    }

    .volume input {
      appearance: none;
      display: block;
      margin: 0;
      width: var(--height);
      height: var(--width);
      margin-left: calc(var(--height) / -2 + var(--width) / 2);
      margin-top: calc(var(--height) / 2 - var(--width) / 2);
      transform: rotate(-0.25turn);
      border-radius: calc(var(--width) / 2);
      color: #2962ff;
      background: linear-gradient(
        to right,
        currentColor var(--progress),
        #333 0,
        #333 calc(100% - var(--progress))
      );
    }

    .volume input::-webkit-slider-thumb {
      appearance: none;
      display: block;
      width: var(--width);
      height: var(--width);
      border-radius: 50%;
      background-color: currentColor;
      transition: transform 0.2s ease;
      transform: scale(1.5);
    }

    .volume input:hover::-webkit-slider-thumb {
      transform: scale(2);
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

    audio.volume = 0.25;
    // audio.muted = true;
    audio.src = this.track.path;
    audio.addEventListener(
      'durationchange',
      () => ((audio.currentTime = 180), this.setProgressState()),
    );

    audio.addEventListener('play', this.setPlayState, { passive: true });
    audio.addEventListener('pause', this.setPlayState, { passive: true });
    this.setPlayState();

    audio.addEventListener('volumechange', this.setMutedState, { passive: true });
    this.setMutedState();

    this.setProgressState();

    audio.addEventListener('volumechange', this.setVolumeState, { passive: true });
    this.setVolumeState();
  }

  private setPlayState = () => {
    this.isPlaying = !audio.paused;
    if (this.isPlaying) this.updateProgressState();
    else this.cancelUpdateProgressState();
  };
  private setMutedState = () => (this.isMuted = audio.muted);
  private setProgressState = () => (this.progress = audio.currentTime);
  private setVolumeState = () => (this.volume = audio.volume);

  private progressAnimationFrame = 0;
  private updateProgressState = () => {
    this.setProgressState();
    this.progressAnimationFrame = requestAnimationFrame(this.updateProgressState);
  };
  private cancelUpdateProgressState = () => cancelAnimationFrame(this.progressAnimationFrame);

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
    if (!this.isPlaying) this.setProgressState();
  }

  @eventOptions({ passive: true })
  private setVolume(event: Event) {
    audio.volume = +(<HTMLInputElement>event.target).value;
  }

  render() {
    return html`<div
        class="progress"
        style="--progress: ${(this.progress / this.track.duration) * 100}%"
      >
        <div class="progress__value"></div>
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
        <div class="audio">
          <button @click="${this.muteUnmute}" class="${classMap({ muted: this.isMuted })}">
            ${icon(
              this.volume < 0.25
                ? mdiVolumeLow
                : this.volume > 0.75
                ? mdiVolumeHigh
                : mdiVolumeMedium,
            )}
          </button>
          <div class="volume" style="--progress: ${this.volume * 100}%">
            <input
              type="range"
              min="0"
              value="${this.volume}"
              max="1"
              step="0.01"
              @input="${this.setVolume}"
            />
          </div>
        </div>
      </div>`;
  }
}
