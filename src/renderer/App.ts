import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import { router } from './router';
import './components/AppTitleBar';
import './components/AppMainNavigation';
import './components/AppSettings';

@customElement('app-root')
export class App extends LitElement {
  static styles = css`
    :host {
      display: grid;
      grid-template-rows: auto 1fr;
      height: 100%;
    }

    main {
      display: grid;
      grid-auto-flow: column;
      grid-template-columns: auto 1fr;
    }
  `;

  @state()
  private page = html`Hallo`;

  connectedCallback() {
    super.connectedCallback();

    router.on('settings', () => (this.page = html`<app-settings></app-settings>`));
    router.on('*', () => (this.page = html`Hallo`));
  }

  render() {
    return html`<app-title-bar></app-title-bar>
      <main>
        <app-main-navigation></app-main-navigation>
        ${this.page}
      </main>`;
  }
}
