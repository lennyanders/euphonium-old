import { basename } from 'path';
import { totalist } from 'totalist';
import { parseFile } from 'music-metadata';
import { settingsStore } from '../settings';
import { database } from '../database';
import type * as Tables from './Tables';
import { table } from './utils/selector';

export const buildData = async () => {
  console.time('load files');

  const clear = database.prepare(`DELETE FROM ${table('track')}`);
  const insert = database.prepare<Omit<Tables.track, 'id'>>(
    `INSERT INTO ${table(
      'track',
    )} (path, fileName, dateFileModified, duration, number, count, diskNumber, diskCount, year, artists, title, album, albumArtists) VALUES (@path, @fileName, @dateFileModified, @duration, @number, @count, @diskNumber, @diskCount, @year, @artists, @title, @album, @albumArtists)`,
  );

  const insertMany = database.transaction((tracks: Omit<Tables.track, 'id'>[]) => {
    for (const track of tracks) insert.run(track);
  });

  const inserts: Omit<Tables.track, 'id'>[] = [];
  await Promise.all(
    settingsStore.store.libraryFolders.map((folder) => {
      return totalist(folder, async (_, path, stats) => {
        if (!/\.aac$|\.mp3$|\.ogg$|\.wav$|\.flac$|\.m4a$/.test(path)) return;
        const { format, common } = await parseFile(path, { duration: true });

        inserts.push(<Omit<Tables.track, 'id'>>{
          path,
          fileName: basename(path),
          dateFileModified: stats.mtimeMs,
          duration: format.duration,
          number: common.track.no,
          count: common.track.of,
          diskNumber: common.disk.no,
          diskCount: common.disk.of,
          year: common.year,
          artists: common.artist,
          title: common.title,
          album: common.album,
          albumArtists: common.albumartist,
        });
      });
    }),
  );

  clear.run();
  insertMany(inserts);

  console.timeEnd('load files');
  console.log(inserts.length);
};
