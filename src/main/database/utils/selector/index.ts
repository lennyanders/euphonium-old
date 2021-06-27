import type * as Tables from '../../Tables';

const createSelector = <T>(prefix?: keyof Tables.tables) => {
  return (tableOrColumn: keyof T) => `${prefix ? `${prefix}.` : ''}${tableOrColumn}`;
};

export const table = createSelector<Tables.tables>();

export const sqlite_master = createSelector<Tables.sqlite_master>('sqlite_master');
export const track = createSelector<Tables.track>('track');
