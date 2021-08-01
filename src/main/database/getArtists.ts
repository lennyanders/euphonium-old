import { getConnection } from '../database';
import { Track } from './entity/track';

export interface Artist {
  name: string;
  tracks: number;
  albums: number;
}

export const getArtists = async () => {
  const trackRepository = (await getConnection()).getRepository(Track);
  const artists = await trackRepository
    .createQueryBuilder('track')
    .select([
      'track.artists AS name',
      'COUNT(*) AS tracks',
      '(SELECT COUNT(*) FROM album WHERE album.artists = track.artists) AS albums',
    ])
    .groupBy('track.artists')
    .getRawMany<Artist>();

  return artists;
};
