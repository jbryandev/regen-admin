"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "@/server/db";
import { attendance } from "@/server/db/schema/app";

export const markPresent = async (meeting, participant) => {
  const result = await db.insert(attendance).values({
    meetingId: meeting.id,
    participantId: participant.id,
  });
  revalidatePath("/attendance" + meeting.id);
};

export const markNotPresent = async (meeting, participant) => {
  const result = await db
    .delete(attendance)
    .where(
      and(
        eq(attendance.meetingId, meeting.id),
        eq(attendance.participantId, participant.id),
      ),
    );
  revalidatePath("/attendance" + meeting.id);
};
