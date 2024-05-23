"use server";

import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import type { MeetingWithScheduleItem } from "@/app/(app)/attendance/[meetingId]/attendance";
import { type Participant } from "@/app/(app)/attendance/[meetingId]/attendance-button";
import { db } from "@/server/db";
import { attendance } from "@/server/db/schema/app";

export const addAttendance = async (
  meeting: MeetingWithScheduleItem,
  participant: Participant,
) => {
  try {
    await db.insert(attendance).values({
      meetingId: meeting.id,
      participantId: participant.id,
    });
    revalidatePath("/attendance" + meeting.id);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: "Unknown error" };
    }
  }
};

export const deleteAttendance = async (
  meeting: MeetingWithScheduleItem,
  participant: Participant,
) => {
  try {
    await db
      .delete(attendance)
      .where(
        and(
          eq(attendance.meetingId, meeting.id),
          eq(attendance.participantId, participant.id),
        ),
      );
    revalidatePath("/attendance" + meeting.id);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: "Unknown error" };
    }
  }
};
