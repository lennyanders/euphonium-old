import { getConnection } from '../database';
import { Album } from './entity/album';

export const getAlbums = async () => {
  const albumRepository = (await getConnection()).getRepository(Album);
  const albums = await albumRepository.find();

  return albums;
};
