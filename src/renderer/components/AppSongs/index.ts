import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '@lit-labs/virtualizer';
import { Layout1d } from '@lit-labs/virtualizer';
import { Ref } from 'lit/directives/ref';
import { RendererTrack } from '../../../main/database/getTracks';

import './SongEntry';

const renderTrack = (track: RendererTrack) =>
  html`<li><song-entry .track="${track}"></song-entry></li>` as TemplateResult;

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

  @property({ attribute: false })
  scrollElement: Ref<HTMLElement>;

  @state()
  tracks = window.audioData.getTracks((tracks) => (this.tracks = tracks));

  render() {
    return html`<h1>Songs (${this.tracks.length})</h1>
      ${this.tracks.length
        ? html`<ul>
            <lit-virtualizer
              .items="${this.tracks}"
              .renderItem="${renderTrack}"
              .layout="${Layout1d}"
              .scrollTarget="${this.scrollElement.value}"
              .keyFunction="${(track: RendererTrack) => track.path}"
            ></lit-virtualizer>
          </ul>`
        : html`<p>Start adding sources and listening to music!</p>`} `;
  }
}
