import { RendererTrack } from '../../../main/database/getTracks';
import { VirtualScroller } from '../VirtualScroller';
import { SongEntry } from './SongEntry';

export const SongsList = ({ tracks }: { tracks: RendererTrack[] }) => {
  if (!tracks.length) return <p>Start adding sources and listening to music!</p>;

  const songEntries = tracks.map((track) => <SongEntry key={track.path} track={track} />);
  if (tracks.length <= 200) return <ul>{songEntries}</ul>;

  return <VirtualScroller rowHeight={24}>{songEntries}</VirtualScroller>;
};
