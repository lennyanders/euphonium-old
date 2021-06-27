import { join } from 'path';
import { readFileSync } from 'fs';
import { app } from 'electron';
import SqliteDatabase from 'better-sqlite3';
import type * as Tables from './Tables';
import { table, sqlite_master } from './utils/selector';

// @ts-ignore
import sqlSetup from './setup.sql';

const databasePath = join(app.getPath('userData'), 'Euphonium.db');
const database = new SqliteDatabase(databasePath);

const statement = database.prepare(
  `SELECT ${sqlite_master('name')} FROM ${table('sqlite_master')} WHERE ${sqlite_master(
    'type',
  )}='table' AND ${sqlite_master('name')}='track';`,
);

const info = <Pick<Tables.sqlite_master, 'name'>>statement.get();
if (!info) database.exec(readFileSync(sqlSetup, { encoding: 'utf-8' }));

export { database };
