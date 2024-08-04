import WorshipSelector from "@/app/(app)/worship/worship-selector";
import {
  getAvailableSongs,
  getSetlists,
  getSetlistSongs,
} from "@/server/queries";

const WorshipPage = async () => {
  const availableSongs = await getAvailableSongs();
  const setlists = await getSetlists();
  if (setlists.length === 0) throw new Error("No setlists found");
  const activeSetlist = setlists[0];
  if (!activeSetlist) throw new Error("No active setlist found");
  const setlistSongs = await getSetlistSongs(activeSetlist.id);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      <WorshipSelector
        songDB={availableSongs}
        setlist={activeSetlist}
        setlistSongs={setlistSongs}
      />
    </div>
  );
};

export default WorshipPage;
