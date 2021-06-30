import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { TrackModel } from '../../../main/database/getTracks';

@customElement('song-entry')
export class SettingsLibraryEntry extends LitElement {
  static styles = css``;

  @property({ attribute: false })
  track: TrackModel = { path: '', artists: '', title: '', duration: 0, durationFormatted: '' };

  render() {
    return html`${this.track.artists} - ${this.track.title} (${this.track.durationFormatted})`;
  }
}
