/**
 * fork/rewrite of https://github.com/developit/preact-scroll-viewport
 */

import { ComponentChild, JSX } from 'preact';
import { useState, useRef, useMemo, useLayoutEffect } from 'preact/hooks';

const EVENT_OPTS = { passive: true, capture: true };

export const VirtualScroller = ({
  tag = 'ul',
  rowHeight,
  overscan = 10,
  children,
}: {
  tag?: keyof JSX.IntrinsicElements;
  rowHeight: number;
  overscan?: number;
  children: ComponentChild[];
}) => {
  const base = useRef<HTMLElement>(null);
  const [windowHeight, setWindowHeight] = useState(0);
  const [offset, setOffset] = useState(0);

  const height = useMemo(() => rowHeight * children.length, [rowHeight, children.length]);
  const start = useMemo(() => {
    const startWithoutOverscan = (offset / rowHeight) | 0;
    return Math.max(0, startWithoutOverscan - (startWithoutOverscan % overscan));
  }, [offset, rowHeight, overscan]);
  const visibleRowsCount = useMemo(
    () => ((windowHeight / rowHeight) | 0) + overscan,
    [windowHeight, rowHeight],
  );
  const visible = useMemo(
    () => children.slice(start, start + visibleRowsCount + 1),
    [start, visibleRowsCount],
  );

  const resized = () => setWindowHeight(window.innerHeight);
  const scrolled = () => {
    setOffset(Math.max(0, base.current ? -base.current.getBoundingClientRect().top : 0));
  };

  useLayoutEffect(() => {
    resized();
    scrolled();
    window.addEventListener('resize', resized, EVENT_OPTS);
    window.addEventListener('scroll', scrolled, EVENT_OPTS);

    return () => {
      window.removeEventListener('resize', resized, EVENT_OPTS);
      window.removeEventListener('scroll', scrolled, EVENT_OPTS);
    };
  }, []);

  const El = tag;
  return (
    // @ts-ignore
    <El style={{ height }} ref={base}>
      <div style={{ height: start * rowHeight }} />
      {visible}
    </El>
  );
};
