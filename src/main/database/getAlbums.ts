import type { FindManyOptions } from 'typeorm';
import { getConnection } from '../database';
import { Album } from './entity/album';

export const getAlbums = async (partialFindManyOption: Partial<FindManyOptions<Album>> = {}) => {
  const albumRepository = (await getConnection()).getRepository(Album);
  const albums = await albumRepository.find(partialFindManyOption);

  return albums;
};
