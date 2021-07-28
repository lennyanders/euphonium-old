import type { JSX } from 'preact';

export type Props<T extends EventTarget, U> = JSX.DOMAttributes<T> & U;
