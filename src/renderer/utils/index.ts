import type { JSX, ClassAttributes } from 'preact';

export type Props<T extends EventTarget, U> = JSX.DOMAttributes<T> &
  JSX.HTMLAttributes<T> &
  ClassAttributes<T> &
  U;
