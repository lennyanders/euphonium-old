import { mdiReload } from '@mdi/js';
import { LitElement, html, css } from 'lit';
import { customElement, eventOptions, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { icon } from '../../utils';

import './SettingsLibraryEntry';

@customElement('app-settings')
export class AppSettings extends LitElement {
  static styles = css`
    :host {
      padding: 0.5rem 3rem;
    }

    h1 {
      margin-top: 0;
    }

    ul {
      padding-left: 0;
      list-style: none;
    }

    svg {
      display: block;
      width: 1.5rem;
      fill: currentColor;
    }
  `;

  @state()
  private settings = window.settings.getSettings(
    (settingsChanges) => (this.settings = { ...this.settings, ...settingsChanges }),
  );

  render() {
    return html`<h1>Settings</h1>
      <h2>Audio Sources</h2>
      <button @click="${this.addFolderToLibrary}">Add</button>
      <button @click="${this.rebuildAudioData}">${icon(mdiReload)}</button>
      ${this.settings.libraryFolders.length
        ? html`<ul>
            ${repeat(
              this.settings.libraryFolders,
              (folder) => folder,
              (folder) => html`<li>
                <settings-library-entry folder="${folder}"></settings-library-entry>
              </li>`,
            )}
          </ul>`
        : html`<p>Start adding sources and listening to music!</p>`} `;
  }

  @eventOptions({ passive: true })
  private addFolderToLibrary() {
    window.settings.addFolderToLibrary();
  }

  @eventOptions({ passive: true })
  private rebuildAudioData() {
    window.audioData.rebuild();
  }
}
