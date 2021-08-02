import { useContext } from 'preact/hooks';
import { RendererTrack } from '../../../main/database/getTracks';
import { MainRef } from '../../App';
import { VirtualScroller } from '../VirtualScroller';
import { SongEntry } from './SongEntry';

export const SongsList = ({ tracks }: { tracks: RendererTrack[] }) => {
  if (!tracks.length) return <p>Start adding sources and listening to music!</p>;

  const songEntries = tracks.map((track) => <SongEntry key={track.path} track={track} />);
  if (tracks.length <= 200) return <ul>{songEntries}</ul>;

  const mainRef = useContext(MainRef);
  return (
    <VirtualScroller rowHeight={24} scrollContainer={mainRef!.current!}>
      {songEntries}
    </VirtualScroller>
  );
};
