import { database } from '../database';
import type * as Tables from './Tables';
import { table, track } from './utils/selector';
import { getFormattedTime } from '../../shared/utils';

type DbTracks = Pick<Tables.track, 'path' | 'artists' | 'title' | 'duration'>;

export interface TrackModel extends DbTracks {
  durationFormatted: string;
}

export const getTracks = () => {
  const statement = database.prepare(
    `SELECT ${track('path')}, ${track('artists')}, ${track('title')}, ${track(
      'duration',
    )} FROM ${table('track')};`,
  );

  const dbTracks = <DbTracks[]>statement.all();

  return dbTracks.map(
    (track) => <TrackModel>{ ...track, durationFormatted: getFormattedTime(track.duration) },
  );
};
