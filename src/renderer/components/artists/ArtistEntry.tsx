import type { Artist } from '../../../main/database/getArtists';

export const ArtistEntry = ({ artist }: { artist: Artist }) => (
  <li>
    <a href={`#artist?artist=${encodeURI(artist.name)}`}>
      {artist.name} ({artist.tracks} tracks) ({artist.albums} albums)
    </a>
  </li>
);
