import { getFormattedTime } from '../../../shared/utils';
import { Track } from '../entity/track';
import { RendererTrack } from '../getTracks';

export const dbTrackToRendererTrack = ({ artists, title, duration }: Track): RendererTrack => ({
  artists,
  title,
  duration,
  durationFormatted: getFormattedTime(duration),
});
