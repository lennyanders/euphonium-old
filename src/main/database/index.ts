import { join } from 'path';
import { readFileSync } from 'fs';
import { app } from 'electron';
import Database from 'better-sqlite3';

// @ts-ignore
import sqlSetup from './setup.sql';

const databasePath = join(app.getPath('userData'), 'Euphonium.db');
const database = new Database(databasePath);

const statement = database.prepare(
  "SELECT name FROM sqlite_master WHERE type='table' AND name='track';",
);

const info = statement.get();
if (!info) {
  console.log(1);
  database.exec(readFileSync(sqlSetup, { encoding: 'utf-8' }));
}

export { database };
