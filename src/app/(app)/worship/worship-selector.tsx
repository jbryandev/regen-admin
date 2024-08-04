"use client";

import { Music, Plus, X } from "lucide-react";
import { useState, useMemo } from "react";

import {
  addSongToSetlist,
  removeSongFromSetlist,
} from "@/app/(app)/worship/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type Setlist, type Song } from "@/lib/types";

const WorshipSelector = ({
  songDB,
  setlist,
  setlistSongs,
}: {
  songDB: Song[];
  setlist: Setlist;
  setlistSongs: Song[];
}) => {
  const [activeSetlist, setActiveSetlist] = useState(setlistSongs);
  const [availableSongs, setAvailableSongs] = useState(songDB);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSongs = useMemo(() => {
    return availableSongs.filter((song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [availableSongs, searchTerm]);

  const handleAddToSetlist = async (song: Song) => {
    setActiveSetlist([...activeSetlist, song]);
    try {
      await addSongToSetlist(song.id, setlist.id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFromSetlist = async (id: string) => {
    setActiveSetlist(activeSetlist.filter((song) => song.id !== id));
    try {
      await removeSongFromSetlist(id, setlist.id);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReorderSetlist = (dragIndex: number, hoverIndex: number) => {
    const updatedSetlist = [...activeSetlist];
    const [removedSong] = updatedSetlist.splice(dragIndex, 1);
    if (removedSong != undefined) {
      updatedSetlist.splice(hoverIndex, 0, removedSong);
      setActiveSetlist(updatedSetlist);
    } else {
      setActiveSetlist(activeSetlist);
    }
  };

  return (
    <>
      <div>
        <h1 className="mb-4 text-lg font-semibold md:text-2xl">
          Active Setlist
        </h1>
        <div className="space-y-4">
          {activeSetlist.map((song, index) => (
            <div
              key={song.id}
              className="flex items-center justify-between rounded-md bg-muted p-3"
            >
              <div className="flex items-center gap-3">
                <div className="cursor-move text-muted-foreground">
                  <Music className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-medium">{song.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {song.artist} - {song.duration}
                  </div>
                </div>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => handleRemoveFromSetlist(song.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="mb-4 text-lg font-semibold md:text-2xl">
          Available Songs
        </h2>
        <div className="space-y-4">
          <Input
            placeholder="Search songs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          <div className="space-y-2">
            {filteredSongs.map((song) => (
              <div
                key={song.id}
                className="flex cursor-pointer items-center justify-between rounded-md bg-muted p-3 hover:bg-muted/50"
                onClick={() => handleAddToSetlist(song)}
              >
                <div>
                  <div className="font-medium">{song.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {song.artist} - {song.duration}
                  </div>
                </div>
                <Button size="icon" variant="ghost">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WorshipSelector;
