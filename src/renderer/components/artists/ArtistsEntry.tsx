import type { Artist } from '../../../main/database/getArtists';

export const ArtistEntry = ({ artist }: { artist: Artist }) => (
  <li>
    {artist.name} ({artist.tracks} tracks) ({artist.albums} albums)
  </li>
);
