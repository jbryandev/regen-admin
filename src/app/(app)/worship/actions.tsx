"use server";

import { and, eq } from "drizzle-orm";

import { db } from "@/server/db";
import { setlistSongs } from "@/server/db/schema/app";

export const addSongToSetlist = async (songId: string, setlistId: string) => {
  const song = await db.query.songs.findFirst({
    where: (song, { eq }) => eq(song.id, songId),
  });

  if (!song) throw new Error("Song not found");

  const setlist = await db.query.setlists.findFirst({
    where: (setlist, { eq }) => eq(setlist.id, setlistId),
  });

  if (!setlist) throw new Error("Setlist not found");

  await db.insert(setlistSongs).values({
    songId: song.id,
    setlistId: setlist.id,
  });
};

export const removeSongFromSetlist = async (
  songId: string,
  setlistId: string,
) => {
  const song = await db.query.songs.findFirst({
    where: (song, { eq }) => eq(song.id, songId),
  });

  if (!song) throw new Error("Song not found");

  const setlist = await db.query.setlists.findFirst({
    where: (setlist, { eq }) => eq(setlist.id, setlistId),
  });

  if (!setlist) throw new Error("Setlist not found");

  await db
    .delete(setlistSongs)
    .where(
      and(
        eq(setlistSongs.songId, song.id),
        eq(setlistSongs.setlistId, setlist.id),
      ),
    );
};
