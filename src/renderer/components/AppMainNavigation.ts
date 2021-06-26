import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-main-navigation')
export class AppMainNavigation extends LitElement {
  static styles = css`
    :host {
      margin-top: -2rem;
      padding-top: 2rem;
      background-color: #111;
    }

    nav {
      padding: 1rem 6rem 1rem 3rem;
      display: grid;
      gap: 2rem;
    }

    a {
      display: flex;
      align-items: center;
      gap: 1rem;
      text-decoration: none;
      font-size: 1.5rem;
      color: hsl(0, 0%, 80%);
      transition: color 0.1s ease;
    }

    a:hover {
      color: hsl(0, 0%, 100%);
    }

    svg {
      width: 1em;
      fill: currentColor;
    }
  `;

  render() {
    return html`<nav>
      <a href="#artists">
        <svg viewBox="0 0 24 24">
          <path
            d="M11 14c1 0 2.05.16 3.2.44c-.81.87-1.2 1.89-1.2 3.06c0 .89.25 1.73.78 2.5H3v-2c0-1.19.91-2.15 2.74-2.88C7.57 14.38 9.33 14 11 14m0-2c-1.08 0-2-.39-2.82-1.17C7.38 10.05 7 9.11 7 8c0-1.08.38-2 1.18-2.82C9 4.38 9.92 4 11 4c1.11 0 2.05.38 2.83 1.18C14.61 6 15 6.92 15 8c0 1.11-.39 2.05-1.17 2.83c-.78.78-1.72 1.17-2.83 1.17m7.5-2H22v2h-2v5.5a2.5 2.5 0 0 1-2.5 2.5a2.5 2.5 0 0 1-2.5-2.5a2.5 2.5 0 0 1 2.5-2.5c.36 0 .69.07 1 .21V10z"
          ></path>
        </svg>
        Artists
      </a>
      <a href="#albums">
        <svg viewBox="0 0 24 24">
          <path
            d="M12 11a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1m0 5.5c-2.5 0-4.5-2-4.5-4.5s2-4.5 4.5-4.5s4.5 2 4.5 4.5s-2 4.5-4.5 4.5M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2z"
          ></path>
        </svg>
        Albums
      </a>
      <a href="#songs">
        <svg viewBox="0 0 24 24">
          <path
            d="M12 3v10.55c-.59-.34-1.27-.55-2-.55c-2.21 0-4 1.79-4 4s1.79 4 4 4s4-1.79 4-4V7h4V3h-6z"
          ></path>
        </svg>
        Songs
      </a>
      <a href="#playlists">
        <svg viewBox="0 0 24 24">
          <path
            d="M15 6H3v2h12V6m0 4H3v2h12v-2M3 16h8v-2H3v2M17 6v8.18c-.31-.11-.65-.18-1-.18a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3V8h3V6h-5z"
          ></path>
        </svg>
        Playlists
      </a>
      <a href="#folders">
        <svg viewBox="0 0 24 24">
          <path
            d="M10 4l2 2h8a2 2 0 0 1 2 2v10c0 1.1-.9 2-2 2H4a2 2 0 0 1-2-2V6c0-1.11.89-2 2-2h6m9 5h-3.5v4.06L15 13a2 2 0 1 0 0 4c1.11 0 2-.89 2-2v-4h2V9z"
          ></path>
        </svg>
        Folders
      </a>
      <a href="#settings">
        <svg viewBox="0 0 24 24">
          <path
            d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1c0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66z"
          ></path>
        </svg>
        Settings
      </a>
    </nav>`;
  }
}
