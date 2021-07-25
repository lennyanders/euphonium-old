import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { RendererTrack } from '../../../main/database/getTracks';

@customElement('song-entry')
export class SettingsLibraryEntry extends LitElement {
  static styles = css``;

  @property({ attribute: false })
  track: RendererTrack = { path: '', artists: '', title: '', duration: 0, durationFormatted: '' };

  render() {
    return html`${this.track.artists} - ${this.track.title} (${this.track.durationFormatted})`;
  }
}
