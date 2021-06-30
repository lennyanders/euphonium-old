import { LitElement, html, css } from 'lit';
import { customElement, eventOptions, state } from 'lit/decorators.js';

@customElement('app-title-bar')
export class AppTitleBar extends LitElement {
  static styles = css`
    :host {
      -webkit-app-region: drag;
      display: flex;
      justify-content: flex-end;
    }

    .window-actions {
      -webkit-app-region: no-drag;
      display: flex;
    }

    button {
      background-color: transparent;
      border: 0;
      padding: 8px 17px;
    }

    button:hover {
      background-color: hsla(0, 0%, 100%, 0.22);
    }

    button.close:hover {
      background-color: hsl(355, 86%, 49%);
    }

    svg {
      display: block;
      fill: none;
      width: 0.75rem;
    }

    [stroke-width] {
      stroke: currentColor;
    }
  `;

  @state()
  private isMaximized = window.windowActions.getMaximizedState(
    (isMaximized) => (this.isMaximized = isMaximized),
  );

  render() {
    return html`<div class="window-actions">
      <button @click="${this.windowAction('minimize')}">
        <svg viewBox="0 0 12 12">
          <line stroke-width=".9" shape-rendering="crispEdges" x1="1" y1="5.5" x2="11" y2="5.5" />
        </svg>
      </button>
      <button @click="${this.windowAction('maximize')}" ?hidden="${this.isMaximized}">
        <svg viewBox="0 0 12 12" shape-rendering="crispEdges">
          <rect stroke-width=".9" x="1.5" y="1.5" width="9" height="9" />
        </svg>
      </button>
      <button @click="${this.windowAction('unmaximize')}" ?hidden="${!this.isMaximized}">
        <svg viewBox="0 0 12 12" stroke-width=".9" shape-rendering="crispEdges">
          <rect x="1.5" y="3.5" width="7" height="7" />
          <polyline points="3.5,3.5 3.5,1.5 10.5,1.5 10.5,8.5 8.5,8.5" />
        </svg>
      </button>
      <button class="close" @click="${this.windowAction('close')}">
        <svg viewBox="0 0 12 12">
          <path stroke-width=".9" d="M1,1 l 10,10 M1,11 l 10,-10" />
        </svg>
      </button>
    </div>`;
  }

  @eventOptions({ passive: true })
  private windowAction(option: 'minimize' | 'maximize' | 'unmaximize' | 'close') {
    return () => window.windowActions[option]();
  }
}
