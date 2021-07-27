import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ref, createRef } from 'lit/directives/ref';

import { router } from './router';
import './components/AppTitleBar';
import './components/AppMainNavigation';
import './components/AppPlayer';
import './components/AppSongs';
import './components/AppSettings';

@customElement('app-root')
export class App extends LitElement {
  static styles = css`
    :host {
      display: grid;
      grid-template: 'title title' auto 'nav content' 1fr 'player player' auto / auto 1fr;
      height: 100%;
      overflow: hidden;
    }

    app-title-bar {
      grid-area: title;
      z-index: 1;
    }

    app-main-navigation {
      grid-area: nav;
    }

    main {
      grid-area: content;
    }

    main > * {
      display: block;
    }

    app-main-navigation,
    main {
      overflow-y: auto;
      margin: -2rem 0;
      padding: 2rem 0;
    }

    main::-webkit-scrollbar {
      width: 0.75rem;
    }
    main::-webkit-scrollbar-button {
      height: 2rem;
    }
    main::-webkit-scrollbar-thumb {
      background-color: #333;
    }

    app-player {
      z-index: 1;
      grid-area: player;
    }
  `;

  @state()
  private page = html`1`;

  mainRef = createRef<HTMLElement>();

  constructor() {
    super();

    router.on('settings', () => (this.page = html`<app-settings></app-settings>`));
    router.on(
      'songs',
      () => (this.page = html`<app-songs .scrollElement="${this.mainRef}"></app-songs>`),
    );
    router.on('*', () => (this.page = html`404`));
  }

  render() {
    return html`<app-title-bar></app-title-bar>
      <app-main-navigation></app-main-navigation>
      <main ${ref(this.mainRef)}>${this.page}</main>
      <app-player></app-player>`;
  }
}
