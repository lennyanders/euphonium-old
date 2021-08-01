import { RendererTrack } from '../../../main/database/getTracks';

export const SongEntry = ({ track }: { track: RendererTrack }) => (
  <li>
    {track.artists || 'Unknown artist'} - {track.title} ({track.durationFormatted})
  </li>
);
