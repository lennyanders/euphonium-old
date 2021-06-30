CREATE TABLE IF NOT EXISTS track (
   path TEXT NOT NULL UNIQUE,
   fileName TEXT NOT NULL,
   dateFileModified INTEGER,
   duration INTEGER NOT NULL,
   number INTEGER,
   count INTEGER,
   diskNumber INTEGER,
   diskCount INTEGER,
   year INTERGER,
   artists TEXT,
   title TEXT,
   album TEXT,
   albumArtists TEXT,
   PRIMARY KEY (path)
);