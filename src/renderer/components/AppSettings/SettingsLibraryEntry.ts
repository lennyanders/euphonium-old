import { LitElement, html, css } from 'lit';
import { customElement, eventOptions, property } from 'lit/decorators.js';
import { mdiClose } from '@mdi/js';
import { icon } from '../../utils';

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

  @property({ attribute: false })
  folder: string = '';

  render() {
    return html`${this.folder}
      <button @click="${this.removeFolderFromLibrary}">${icon(mdiClose)}</button>`;
  }

  @eventOptions({ passive: true })
  private removeFolderFromLibrary() {
    window.settings.removeFolderFromLibrary(this.folder);
  }
}
