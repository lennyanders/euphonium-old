import type { Artist } from '../../../main/database/getArtists';

export const ArtistEntry = ({ artist }: { artist: Artist }) => (
  <li>
    <a href={`#artist?artist=${encodeURIComponent(artist.name || '')}`}>
      {artist.name || 'Unknown artist'} ({artist.tracks} tracks) ({artist.albums} albums)
    </a>
  </li>
);
