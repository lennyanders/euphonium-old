import { useState } from 'preact/hooks';
import type { WindowActions } from '../../preload';
import classes from './TitleBar.module.css';

const Button = ({
  paths,
  action,
}: {
  paths: string[];
  action: keyof Pick<WindowActions, 'minimize' | 'maximize' | 'unmaximize' | 'close'>;
}) => (
  <button class={classes.windowAction} onClick={window.windowActions[action]}>
    <svg viewBox='0 0 12 12' class={classes.icon}>
      {paths.map((path) => (
        <path d={path} />
      ))}
    </svg>
  </button>
);

export const TitleBar = () => {
  const [isMaximized, setIsMaximized] = useState(
    window.windowActions.getMaximizedState((isMaximized) => setIsMaximized(isMaximized)),
  );

  return (
    <div class={classes.titlebar}>
      <div class={classes.windowActions}>
        <Button paths={['M1 5.5h10']} action='minimize' />
        <Button
          paths={isMaximized ? ['M1.5 3.5h7v7h-7z', 'M3.5 3.5v-2h7v7h-2'] : ['M1.5 1.5h9v9h-9z']}
          action={isMaximized ? 'unmaximize' : 'maximize'}
        />
        <Button paths={['M1 1l10 10M1 11L11 1']} action='close' />
      </div>
    </div>
  );
};
