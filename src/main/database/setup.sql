CREATE TABLE IF NOT EXISTS track (
   id INTEGER NOT NULL UNIQUE,
   path TEXT NOT NULL,
   fileName TEXT NOT NULL,
   dateFileModified INTEGER,
   duration INTEGER NOT NULL,
   number INTEGER,
   count INTEGER,
   discNumber INTEGER,
   discCount INTEGER,
   year INTERGER,
   artists TEXT,
   title TEXT NOT NULL,
   album TEXT,
   albumArtists TEXT,
   PRIMARY KEY (id)
);