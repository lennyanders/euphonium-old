import { database } from '../database';
import type * as Tables from './Tables';
import { table, track } from './utils/selector';

export const getTracks = () => {
  const statement = database.prepare(
    `SELECT ${track('path')}, ${track('artists')}, ${track('title')}, ${track(
      'duration',
    )} FROM ${table('track')};`,
  );

  return statement.all() as Pick<Tables.track, 'path' | 'artists' | 'title' | 'duration'>[];
};
