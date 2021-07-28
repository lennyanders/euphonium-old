import classes from './icon.module.css';

export const Icon = ({ path }: { path: string }) => (
  <svg viewBox="0 0 24 24" class={classes.icon}>
    <path d={path}></path>
  </svg>
);
