import { redirect } from "next/navigation";

import { getActiveSetlist, getSetlistSongs } from "@/server/queries";

const SongPage = async ({ params }: { params: { song: string } }) => {
  const setlist = await getActiveSetlist();
  if (!setlist) throw new Error("No active setlist found");
  const songs = await getSetlistSongs(setlist.id);
  const currentSong = songs[parseInt(params.song) - 1];
  if (!currentSong) redirect("/worship");
  const captions = currentSong.captions ? "&cc_load_policy=1" : "";

  return (
    <div className="absolute left-0 top-0 z-50 h-full w-full bg-black">
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${currentSong.youtubeId}?autoplay=1&controls=0${captions}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default SongPage;
