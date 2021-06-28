import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat';
import type * as Tables from '../../../main/database/Tables';

@customElement('app-songs')
export class App extends LitElement {
  static styles = css`
    :host {
      padding: 0.5rem 3rem;
    }
  `;

  @state()
  tracks: Pick<Tables.track, 'path' | 'artists' | 'title' | 'duration'>[] = [];

  constructor() {
    super();

    window.audioData.getTracks((tracks) => ((this.tracks = tracks), console.log(tracks)));
  }

  private getTime(time: number) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  render() {
    return html`<h1>Songs (${this.tracks.length})</h1>
      ${this.tracks.length
        ? html`<ul>
            ${repeat(
              this.tracks,
              (track) => track.path,
              (track) =>
                html`<li>${track.artists} - ${track.title} (${this.getTime(track.duration)})</li>`,
            )}
          </ul>`
        : html`<p>Start adding sources and listening to music!</p>`} `;
  }
}
