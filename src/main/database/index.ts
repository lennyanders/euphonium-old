import { join } from 'path';
import { createConnection, Connection } from 'typeorm';
import { userDataPath } from '../consts';
import { Track } from './entity/track';

let conn: Connection;

export const getConnection = async () => {
  if (!conn) {
    conn = await createConnection({
      type: 'better-sqlite3',
      database: join(userDataPath, 'euphonium.db'),
      entities: [Track],
      synchronize: true,
    });
  }

  return conn;
};
