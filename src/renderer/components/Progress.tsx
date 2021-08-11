import type { Props } from '../utils';
import classes from './Progress.module.css';

export const Progress = ({
  vertical = false,
  ...props
}: Props<
  HTMLInputElement,
  { value: number; max: number; vertical?: boolean | string; step?: number }
>) => {
  return (
    <div
      class={`${classes.progress}${vertical ? ` ${classes.progressVertical}` : ''}`}
      style={{
        '--progress': `${(props.value / props.max) * 100}%`,
        ...(vertical && { '--verticalSize': typeof vertical === 'string' ? vertical : '5rem' }),
      }}
    >
      <div class={classes.progressHandle}></div>
      <input class={classes.progressInput} type='range' min='0' {...props} />
    </div>
  );
};
