import { getConnection } from '.';
import { getFormattedTime } from '../../shared/utils';
import { dbTrackToRendererTrack } from './converters/dbTrackToRendererTrack';
import { Album } from './entity/album';
import { RendererTrack } from './getTracks';

export interface AlbumWithTracks {
  previewCoverPath?: string;
  coverPath?: string;
  trackCount: number;
  diskCount: number;
  duration: string;
  tracks: Record<number, RendererTrack[]>;
}

export const getAlbumWithTracks = async (
  artist: string,
  title: string,
): Promise<AlbumWithTracks | undefined> => {
  const albumRepository = (await getConnection()).getRepository(Album);

  const album = await albumRepository
    .createQueryBuilder('album')
    .where('album.artists = :artist AND album.title = :title', { artist, title })
    .leftJoinAndSelect('album.tracks', 'tracks')
    .orderBy('tracks.number', 'ASC')
    .getOne();

  if (!album) return;

  let duration: number = 0;
  const tracks: Record<number, RendererTrack[]> = {};
  for (const track of album.tracks!) {
    duration += track.duration;
    const rendererTrack = dbTrackToRendererTrack(track);
    const diskNumber = track.diskNumber || 1;

    const array = tracks[diskNumber];
    if (!array) tracks[diskNumber] = [rendererTrack];
    else array.push(rendererTrack);
  }

  return {
    previewCoverPath: album.previewCoverPath,
    coverPath: album.coverPath,
    trackCount: album.tracks!.length,
    diskCount: Object.keys(tracks).length,
    duration: getFormattedTime(duration),
    tracks,
  };
};
