import { useState } from 'preact/hooks';
import classes from './AppTitleBar.module.css';

export const AppTitleBar = () => {
  const [isMaximized, setIsMaximized] = useState(
    window.windowActions.getMaximizedState((isMaximized) => setIsMaximized(isMaximized)),
  );

  const windowAction = (option: 'minimize' | 'maximize' | 'unmaximize' | 'close') => {
    return () => window.windowActions[option]();
  };

  return (
    <div class={classes.titlebar}>
      <div class={classes.windowActions}>
        <button class={classes.windowAction} onClick={windowAction('minimize')}>
          <svg viewBox="0 0 12 12">
            <line stroke-width=".9" shape-rendering="crispEdges" x1="1" y1="5.5" x2="11" y2="5.5" />
          </svg>
        </button>
        <button
          class={classes.windowAction}
          onClick={windowAction('maximize')}
          hidden={isMaximized}
        >
          <svg viewBox="0 0 12 12" shape-rendering="crispEdges">
            <rect stroke-width=".9" x="1.5" y="1.5" width="9" height="9" />
          </svg>
        </button>
        <button
          class={classes.windowAction}
          onClick={windowAction('unmaximize')}
          hidden={!isMaximized}
        >
          <svg viewBox="0 0 12 12" stroke-width=".9" shape-rendering="crispEdges">
            <rect x="1.5" y="3.5" width="7" height="7" />
            <polyline points="3.5,3.5 3.5,1.5 10.5,1.5 10.5,8.5 8.5,8.5" />
          </svg>
        </button>
        <button
          class={`${classes.windowAction} ${classes.windowActionClose}`}
          onClick={windowAction('close')}
        >
          <svg viewBox="0 0 12 12">
            <path stroke-width=".9" d="M1,1 l 10,10 M1,11 l 10,-10" />
          </svg>
        </button>
      </div>
    </div>
  );
};
