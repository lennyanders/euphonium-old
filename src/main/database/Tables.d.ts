export interface sqlite_master {
  type: 'table' | 'index' | 'view' | 'trigger';
  name: string;
  tbl_name: string;
  rootpage: number;
  sql: string;
}

export interface track {
  path: string;
  fileName: string;
  dateFileModified: number;
  duration: number;
  number: number;
  count: number;
  diskNumber: number;
  diskCount: number;
  year: number;
  artists: string;
  title: string;
  album: string;
  albumArtists: string;
}

export interface tables {
  sqlite_master: sqlite_master;
  track: track;
}
