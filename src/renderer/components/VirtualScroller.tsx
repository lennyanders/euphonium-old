/**
 * fork/rewrite of https://github.com/developit/preact-scroll-viewport
 */

import { ComponentChild, JSX } from 'preact';
import { useState, useRef, useMemo, useLayoutEffect } from 'preact/hooks';

const EVENT_OPTS = { passive: true, capture: true };

export const VirtualScroller = ({
  tag = 'ul',
  rowHeight,
  scrollContainer = document.documentElement,
  overscan = 10,
  children,
}: {
  tag?: keyof JSX.IntrinsicElements;
  rowHeight: number;
  scrollContainer?: HTMLElement;
  overscan?: number;
  children: ComponentChild[];
}) => {
  const base = useRef<HTMLElement>(null);
  const [scrollContainerHeight, setScrollContainerHeight] = useState(0);
  const [offset, setOffset] = useState(0);

  const height = useMemo(() => rowHeight * children.length, [rowHeight, children.length]);
  const start = useMemo(() => {
    const startWithoutOverscan = (offset / rowHeight) | 0;
    return Math.max(0, startWithoutOverscan - (startWithoutOverscan % overscan));
  }, [offset, rowHeight, overscan]);
  const visibleRowsCount = useMemo(
    () => ((scrollContainerHeight / rowHeight) | 0) + overscan,
    [scrollContainerHeight, rowHeight],
  );
  const visible = useMemo(
    () => children.slice(start, start + visibleRowsCount + 1),
    [start, visibleRowsCount],
  );

  const scrolled = () => {
    setOffset(Math.max(0, base.current ? -base.current.getBoundingClientRect().top : 0));
  };

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(([entry]) => {
      setScrollContainerHeight(entry.borderBoxSize[0].blockSize);
    });
    resizeObserver.observe(scrollContainer);

    scrolled();
    scrollContainer.addEventListener('scroll', scrolled, EVENT_OPTS);

    return () => {
      resizeObserver.disconnect();
      scrollContainer.removeEventListener('scroll', scrolled, EVENT_OPTS);
    };
  }, [scrollContainer]);

  const El = tag;
  return (
    // @ts-ignore
    <El style={{ height }} ref={base}>
      <div style={{ height: start * rowHeight }} />
      {visible}
    </El>
  );
};
