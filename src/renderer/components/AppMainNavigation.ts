import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import {
  mdiAccountMusic,
  mdiAlbum,
  mdiCog,
  mdiFolderMusic,
  mdiMusicNote,
  mdiPlaylistMusic,
} from '@mdi/js';
import { icon } from '../utils';

@customElement('app-main-navigation')
export class AppMainNavigation extends LitElement {
  static styles = css`
    :host {
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
      <a href="#artists">${icon(mdiAccountMusic)}Artists</a>
      <a href="#albums">${icon(mdiAlbum)}Albums</a>
      <a href="#songs">${icon(mdiMusicNote)}Songs</a>
      <a href="#playlists">${icon(mdiPlaylistMusic)}Playlists</a>
      <a href="#folders">${icon(mdiFolderMusic)}Folders</a>
      <a href="#settings">${icon(mdiCog)}Settings</a>
    </nav>`;
  }
}
