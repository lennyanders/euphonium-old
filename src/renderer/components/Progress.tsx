import type { Props } from '../utils';
import classes from './Progress.module.css';

export const Progress = ({
  value,
  max,
  ...props
}: Props<HTMLInputElement, { value: number; max: number }>) => {
  return (
    <div class={classes.progress} style={{ '--progress': `${(value / max) * 100}%` }}>
      <div class={classes.progressHandle}></div>
      <input
        class={classes.progressInput}
        type='range'
        min='0'
        value={value}
        max={max}
        {...props}
      />
    </div>
  );
};
