import { getConnection } from '../database';
import { getFormattedTime } from '../../shared/utils';
import { Track } from './entity/track';

type _Track = Pick<Track, 'path' | 'artists' | 'title' | 'duration'>;
export type RendererTrack = _Track & { durationFormatted: string };

export const getTracks = async () => {
  const trackRepository = (await getConnection()).getRepository(Track);
  const dbTracks: _Track[] = await trackRepository.find({
    select: ['path', 'artists', 'title', 'duration'],
  });

  return dbTracks.map<RendererTrack>((track) => ({
    ...track,
    durationFormatted: getFormattedTime(track.duration),
  }));
};
