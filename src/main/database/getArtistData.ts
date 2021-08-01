import { Not } from 'typeorm';
import { getConnection } from '../database';
import { Album } from './entity/album';
import { getTracks, RendererTrack } from './getTracks';

export interface ArtistData {
  albums: Album[];
  singles: RendererTrack[];
}

export const getArtistData = async (artist: string): Promise<ArtistData> => {
  const artists = artist || null;
  const albumRepository = (await getConnection()).getRepository(Album);

  const albums = await albumRepository.find({ where: { artists } });
  const singles = await getTracks({
    where: [
      { artists, albumArtists: null },
      { artists, albumArtists: Not(artists) },
    ],
  });

  return { albums, singles };
};
