import { stat, mkdir } from 'fs/promises';
import { join, dirname } from 'path';
import { totalist } from 'totalist';
import { In, Not } from 'typeorm';
import { v4 as uuid } from 'uuid';
import sharp from 'sharp';
import { settingsStore } from '../../settings';
import { getConnection } from '..';
import { Track } from '../entity/track';
import { Album } from '../entity/album';
import { getTrack } from './getTrack';
import { userDataPath } from '../../consts';

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

  console.time('remove not anymore existing albums from db');
  await albumRepository.delete({
    artists: Not(In(tracksInDb.map((track) => track.albumArtists).filter((a) => a) as string[])),
    title: Not(In(tracksInDb.map((track) => track.albumTitle).filter((a) => a) as string[])),
  });
  console.timeEnd('remove not anymore existing albums from db');

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

  const findAlbumCover = async (
    dir: string,
    fileName = 'cover.jpg',
  ): Promise<
    Pick<Album, 'coverPath' | 'coverDateFileModified' | 'previewCoverPath'> | undefined
  > => {
    try {
      const coverPath = join(dir, fileName);
      const { mtimeMs } = await stat(coverPath);
      return {
        coverPath,
        coverDateFileModified: mtimeMs,
        previewCoverPath: join(userDataPath, 'albumCover', `${uuid()}.avif`),
      };
    } catch (_) {
      if (fileName !== 'cover.png') return await findAlbumCover(dir, 'cover.png');
    }
  };

  console.time('get new album data');
  const albumsToUpsert: Album[] = [];
  const albumsInDb = await albumRepository.find();
  for (const track of tracksToUpsert) {
    if (!track.albumTitle || !track.albumArtists) continue;

    const album = findAlbum(albumsToUpsert, track) || findAlbum(albumsInDb, track);
    if (album) {
      // check albumcover datefile modified and update file if newer
      continue;
    }

    albumsToUpsert.push({
      artists: track.albumArtists,
      title: track.albumTitle,
      ...(await findAlbumCover(dirname(track.path))),
    });
  }
  console.timeEnd('get new album data');

  console.time('generate album preview images');
  await Promise.all(
    albumsToUpsert.map(async (album) => {
      if (!album.coverPath) return;
      try {
        await mkdir(dirname(album.previewCoverPath!), { recursive: true });
        await sharp(album.coverPath, { failOnError: false })
          .resize(500)
          .avif()
          .toFile(album.previewCoverPath!);
      } catch (error) {
        console.error(error);
      }
    }),
  );
  console.timeEnd('generate album preview images');

  console.time('save tracks and albums to db');
  await albumRepository.save(albumsToUpsert, { chunk: 100 });
  await trackRepository.save(tracksToUpsert, { chunk: 100 });
  console.timeEnd('save tracks and albums to db');
};
