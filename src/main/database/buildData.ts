import { basename, extname } from 'path';
import { totalist } from 'totalist';
import { parseFile } from 'music-metadata';
import { In, Not } from 'typeorm';
import { settingsStore } from '../settings';
import { getConnection } from '../database';
import { Track } from './entity/track';

export const buildData = async () => {
  const trackRepository = (await getConnection()).getRepository(Track);

  console.time('get files and stats');
  const fileInfos: { path: string; dateFileModified: number }[] = [];
  await Promise.all(
    settingsStore.store.libraryFolders.map((folder) => {
      return totalist(folder, async (_, path, stats) => {
        if (/\.aac$|\.mp3$|\.ogg$|\.wav$|\.flac$|\.m4a$/.test(path)) {
          fileInfos.push({ path, dateFileModified: stats.mtimeMs });
        }
      });
    }),
  );
  console.timeEnd('get files and stats');

  console.time('remove not anymore existing tracks from db');
  await trackRepository.delete({ path: Not(In(fileInfos.map(({ path }) => path))) });
  console.timeEnd('remove not anymore existing tracks from db');

  console.time('get tracks that need updating');
  const tracksInDb = await trackRepository.find({ select: ['path', 'dateFileModified'] });
  const outdatedFileInfos = fileInfos.filter(({ path, dateFileModified }) => {
    const trackInDb = tracksInDb.find((trackInDb) => trackInDb.path === path);
    return !trackInDb || dateFileModified > trackInDb.dateFileModified;
  });
  console.timeEnd('get tracks that need updating');

  if (!outdatedFileInfos.length) return;

  console.time('get new track data');
  const tracksToUpsert: Track[] = await Promise.all(
    outdatedFileInfos.map(async ({ path, dateFileModified }) => {
      const fileName = basename(path, extname(path));
      const { format, common } = await parseFile(path, { duration: true });
      return {
        path,
        fileName,
        dateFileModified,
        duration: format.duration!,
        number: common.track.no ?? undefined,
        count: common.track.of ?? undefined,
        diskNumber: common.disk.no ?? undefined,
        diskCount: common.disk.of ?? undefined,
        year: common.year,
        artists: common.artist,
        title: common.title,
        album: common.album,
        albumArtists: common.albumartist,
      };
    }),
  );
  console.timeEnd('get new track data');

  console.time('save tracks to db');
  await trackRepository.save(tracksToUpsert, { chunk: 100 });
  console.timeEnd('save tracks to db');
};
