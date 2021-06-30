import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const getTime = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);

  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

@customElement('song-entry')
export class SettingsLibraryEntry extends LitElement {
  static styles = css``;

  @property()
  artists = '';

  @property()
  title = '';

  @property({ type: Number })
  duration = 0;

  render() {
    return html`<li>${this.artists} - ${this.title} (${getTime(this.duration)})</li>`;
  }
}
