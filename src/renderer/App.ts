import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { router } from './router';
import './components/AppTitleBar';
import './components/AppMainNavigation';
import './components/AppSongs';
import './components/AppSettings';

@customElement('app-root')
export class App extends LitElement {
  static styles = css`
    :host {
      display: flex;
      height: 100%;
      overflow-y: hidden;
    }

    main {
      flex: 1;
      overflow-y: auto;
      /* hide bottom scroll button */
      margin-bottom: -28px;
      padding-bottom: 28px;
    }

    main > * {
      display: block;
    }

    /* scroll buttons to allow space on top */
    main::-webkit-scrollbar-button {
      height: 28px;
    }

    main::-webkit-scrollbar {
      width: 0.75rem;
    }

    main::-webkit-scrollbar-thumb {
      background-color: #333;
    }
  `;

  @state()
  private page = html`404`;

  constructor() {
    super();

    router.on('settings', () => (this.page = html`<app-settings></app-settings>`));
    router.on('songs', () => (this.page = html`<app-songs></app-songs>`));
    router.on('*', () => (this.page = html`404`));
  }

  render() {
    return html`<app-title-bar></app-title-bar>
      <app-main-navigation></app-main-navigation>
      <main>${this.page}</main>`;
  }
}
