import type { FindManyOptions } from 'typeorm';
import { getConnection } from '../database';
import { Track } from './entity/track';
import { dbTrackToRendererTrack } from './converters/dbTrackToRendererTrack';

export type RendererTrack = Pick<Track, 'artists' | 'title' | 'duration'> & {
  durationFormatted: string;
};

export const getTracks = async (partialFindManyOption: Partial<FindManyOptions<Track>> = {}) => {
  const trackRepository = (await getConnection()).getRepository(Track);
  const dbTracks: Track[] = await trackRepository.find(partialFindManyOption);

  return dbTracks.map(dbTrackToRendererTrack);
};
