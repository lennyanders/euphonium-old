import { html } from 'lit';

export const icon = (path: string) => {
  return html`<svg viewBox="0 0 24 24"><path d="${path}"></path></svg>`;
};
