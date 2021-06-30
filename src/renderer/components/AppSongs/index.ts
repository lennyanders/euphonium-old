import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat';

import './SongEntry';

@customElement('app-songs')
export class App extends LitElement {
  static styles = css`
    :host {
      padding: 0.5rem 3rem;
    }

    h1 {
      margin-top: 0;
    }
  `;

  @state()
  tracks = window.audioData.getTracks((tracks) => (this.tracks = tracks));

  render() {
    return html`<h1>Songs (${this.tracks.length})</h1>
      ${this.tracks.length
        ? html`<ul>
            ${repeat(
              this.tracks,
              (track) => track.path,
              (track) => html`<li><song-entry .track="${track}"></song-entry></li>`,
            )}
          </ul>`
        : html`<p>Start adding sources and listening to music!</p>`} `;
  }
}
