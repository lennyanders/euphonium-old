import { RendererTrack } from '../../../main/database/getTracks';

export const SongEntry = ({ track }: { track: RendererTrack }) => (
  <li>
    {track.artists} - {track.title} ({track.durationFormatted})
  </li>
);
