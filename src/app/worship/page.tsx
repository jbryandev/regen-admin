import SortableGrid from "@/app/worship/sortable-grid";

export interface Song {
  id: string;
  title: string;
  artist: string;
  length: string;
}

export const setlist: Song[] = [
  {
    id: "Sc6SSHuZvQE",
    title: "Reckless Love",
    artist: "Cory Asbury",
    length: "5:32",
  },
  {
    id: "OpfuKKH_SCE",
    title: "O Come To The Altar",
    artist: "Elevation Worship",
    length: "5:49",
  },
  {
    id: "bJWc4rP-D8c",
    title: "You've Already Won",
    artist: "Shane & Shane",
    length: "4:18",
  },
];

export const songs: Song[] = [
  {
    id: "Sc6SSHuZvQE",
    title: "Reckless Love",
    artist: "Cory Asbury",
    length: "5:32",
  },
  {
    id: "OpfuKKH_SCE",
    title: "O Come To The Altar",
    artist: "Elevation Worship",
    length: "5:49",
  },
  {
    id: "bJWc4rP-D8c",
    title: "You've Already Won",
    artist: "Shane & Shane",
    length: "4:18",
  },
];

export default function WorshipPage({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? "";
  const filteredSonglist = songs.filter(
    (song) =>
      song.title.toLowerCase().includes(search.toLowerCase()) ||
      song.artist.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <main className="container mx-auto">
      <h2 className="mb-4 text-xl font-medium">Current Setlist</h2>
      <SortableGrid setlist={setlist} />
      <h2 className="mb-4 mt-10 text-2xl">Songlist</h2>
    </main>
  );
}
