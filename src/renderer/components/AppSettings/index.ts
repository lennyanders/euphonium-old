import { LitElement, html, css } from 'lit';
import { customElement, eventOptions, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

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
  `;

  @state()
  private libraryFolders: string[] = [];

  constructor() {
    super();

    window.settings.getLibraryFolders((folders) => (this.libraryFolders = folders));
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    console.log(1);
  }

  render() {
    return html`<h1>Settings</h1>
      <h2>Audio Sources</h2>
      <button @click="${this.addFolderToLibrary}">Add</button>
      ${this.libraryFolders.length
        ? html`<ul>
            ${repeat(
              this.libraryFolders,
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
}
