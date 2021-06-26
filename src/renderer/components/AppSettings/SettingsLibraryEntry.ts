import { LitElement, html, css } from 'lit';
import { customElement, eventOptions, property } from 'lit/decorators.js';

@customElement('settings-library-entry')
export class SettingsLibraryEntry extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
    }

    button {
      padding: 0;
      border: 0;
      background-color: transparent;
    }

    svg {
      display: block;
      width: 1.5rem;
      fill: currentColor;
    }
  `;

  @property()
  folder: string = '';

  render() {
    return html`${this.folder}
      <button @click="${this.removeFolderFromLibrary}">
        <svg viewBox="0 0 24 24">
          <path
            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"
          ></path>
        </svg>
      </button>`;
  }

  @eventOptions({ passive: true })
  private removeFolderFromLibrary() {
    window.settings.removeFolderFromLibrary(this.folder);
  }
}
