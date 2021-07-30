import { basename, extname } from 'path';
import { parseFile } from 'music-metadata';
import { Track } from '../entity/track';

export const getTrack = async ({
  path,
  dateFileModified,
}: {
  path: string;
  dateFileModified: number;
}) => {
  const { format, common } = await parseFile(path, { duration: true });
  return <Track>{
    path,
    fileName: basename(path, extname(path)),
    dateFileModified,
    duration: format.duration!,
    number: common.track.no ?? undefined,
    count: common.track.of ?? undefined,
    diskNumber: common.disk.no ?? undefined,
    diskCount: common.disk.of ?? undefined,
    year: common.year,
    artists: common.artist,
    title: common.title,
    albumArtists: common.albumartist,
    albumTitle: common.album,
  };
};
