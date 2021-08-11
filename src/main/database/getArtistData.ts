import { Not } from 'typeorm';
import { Album } from './entity/album';
import { getAlbums } from './getAlbums';
import { getTracks, RendererTrack } from './getTracks';

export interface ArtistData {
  albums: Album[];
  singles: RendererTrack[];
}

export const getArtistData = async (artist: string): Promise<ArtistData> => {
  const artists = artist || null;

  const albums = await getAlbums({ where: { artists } });
  const singles = await getTracks({
    where: [
      { artists, albumArtists: null },
      { artists, albumArtists: Not(artists) },
    ],
  });

  return { albums, singles };
};
