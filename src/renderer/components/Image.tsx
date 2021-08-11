import { useState } from 'preact/hooks';
import type { Props } from '../utils';
import classes from './Image.module.css';

const decodedImages: string[] = [];

export const Image = ({
  width = 1,
  height = 1,
  ...props
}: Props<HTMLImageElement, { src: string; alt: string; width?: number; height?: number }>) => {
  const [showCover, setShowCover] = useState(decodedImages.includes(props.src));

  if (!showCover) {
    props.ref = async (image) => {
      if (!image) return;

      await image.decode();
      setShowCover(true);
      decodedImages.push(props.src);
    };
  }

  return (
    <img
      class={`${props.class || ''}${classes.image}${showCover ? ` ${classes.imageVisible}` : ''}`}
      width={width}
      height={height}
      loading='lazy'
      {...props}
    />
  );
};
