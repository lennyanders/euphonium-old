import { stat } from 'fs/promises';
import { join, dirname } from 'path';
import { totalist } from 'totalist';
import { In, Not } from 'typeorm';
import { settingsStore } from '../../settings';
import { getConnection } from '..';
import { Track } from '../entity/track';
import { Album } from '../entity/album';
import { getTrack } from './getTrack';

export const buildData = async () => {
  const connection = await getConnection();
  const trackRepository = connection.getRepository(Track);
  const albumRepository = connection.getRepository(Album);

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
  const tracksToUpsert: Track[] = await Promise.all(outdatedFileInfos.map(getTrack));
  console.timeEnd('get new track data');

  const findAlbum = (albums: Album[], track: Track) => {
    if (!albums.length) return;
    return albums.find(
      (album) => album.artists === track.albumArtists && album.title === track.albumTitle,
    );
  };

  console.time('get new album data');
  const albumsToUpsert: Album[] = [];
  const albumsInDb = await albumRepository.find();
  for (const track of tracksToUpsert) {
    if (!track.albumTitle || !track.albumArtists) continue;

    let album = findAlbum(albumsToUpsert, track) || findAlbum(albumsInDb, track);
    if (!album) {
      album = { artists: track.albumArtists, title: track.albumTitle };
      try {
        const coverPath = join(dirname(track.path), 'cover.jpg');
        const { mtimeMs } = await stat(coverPath);
        album.coverPath = coverPath;
        album.coverDateFileModified = mtimeMs;
      } catch (_) {}
      albumsToUpsert.push(album);
    }
  }
  console.timeEnd('get new album data');

  console.time('save tracks and albums to db');
  await albumRepository.save(albumsToUpsert, { chunk: 100 });
  await trackRepository.save(tracksToUpsert, { chunk: 100 });
  console.timeEnd('save tracks and albums to db');
};
