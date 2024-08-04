"use client";

import { Music, Plus, X } from "lucide-react";
import { useState, useMemo } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { type Song } from "@/lib/types";

export default function Component() {
  const [activeSetlist, setActiveSetlist] = useState([
    {
      id: "1",
      title: "10,000 Reasons (Bless the Lord)",
      artist: "Matt Redman",
      duration: "3:32",
      youtubeId: "1",
    },
    {
      id: "2",
      title: "Oceans (Where Feet May Fail)",
      artist: "Hillsong UNITED",
      duration: "3:32",
      youtubeId: "2",
    },
    {
      id: "3",
      title: "Reckless Love",
      artist: "Cory Asbury",
      duration: "3:32",
      youtubeId: "3",
    },
  ] as Song[]);
  const [availableSongs, setAvailableSongs] = useState([
    {
      id: "4",
      title: "Good Good Father",
      artist: "Chris Tomlin",
      duration: "3:32",
      youtubeId: "4",
    },
    {
      id: "5",
      title: "Way Maker",
      artist: "Leeland",
      duration: "3:32",
      youtubeId: "5",
    },
    {
      id: "6",
      title: "Raise a Hallelujah",
      artist: "Bethel Music",
      duration: "3:32",
      youtubeId: "6",
    },
    {
      id: "7",
      title: "Who You Say I Am",
      artist: "Hillsong Worship",
      duration: "3:32",
      youtubeId: "7",
    },
    {
      id: "8",
      title: "Raise It Up",
      artist: "Elevation Worship",
      duration: "3:32",
      youtubeId: "8",
    },
  ] as Song[]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredSongs = useMemo(() => {
    return availableSongs.filter((song) =>
      song.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [availableSongs, searchTerm]);

  const handleAddToSetlist = (song: Song) => {
    setActiveSetlist([...activeSetlist, song]);
  };

  const handleRemoveFromSetlist = (id: string) => {
    setActiveSetlist(activeSetlist.filter((song) => song.id !== id));
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
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
    </div>
  );
}
