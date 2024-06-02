import { and, eq, lte } from "drizzle-orm";
import { type z } from "zod";

import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { type userProfileSchema, users } from "@/server/db/schema/auth";

import "server-only";

type UserProfile = z.infer<typeof userProfileSchema>;

export const getUserProfile = async () => {
  const session = await getServerAuthSession();
  if (!session) throw new Error("Unauthorized");

  const user = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.id, session.user.id),
    columns: { name: true, email: true, phone: true },
  });
  if (!user) throw new Error("Unauthorized");

  return user as UserProfile;
};

export const updateUserProfile = async (data: UserProfile) => {
  const session = await getServerAuthSession();
  if (!session) throw new Error("Unauthorized");

  await db
    .update(users)
    .set({
      name: data.name,
      email: data.email,
      phone: data.phone,
    })
    .where(eq(users.id, session.user.id));
};

export const getLeaderGroup = async (leaderId: string) => {
  const leaderGroup = await db.query.usersToGroups.findFirst({
    where: (group, { eq }) => eq(group.userId, leaderId),
    columns: {
      groupId: true,
    },
    with: {
      group: {
        columns: {
          id: true,
        },
      },
    },
  });

  if (!leaderGroup) throw new Error("No leader group found");

  return leaderGroup?.group;
};

export const getCoachGroups = async (coachId: string) => {
  const coachGroups = await db.query.usersToGroups.findMany({
    where: (group, { eq }) => eq(group.userId, coachId),
    columns: {
      groupId: true,
    },
    with: {
      group: {
        columns: {
          id: true,
        },
      },
    },
  });

  if (coachGroups.length === 0) throw new Error("No coach groups found");

  return coachGroups;
};

export const getMeetingById = async (meetingId: string) => {
  const meeting = await db.query.meetings.findFirst({
    where: (meeting, { eq }) => eq(meeting.id, meetingId),
    with: {
      scheduleItem: true,
    },
  });

  if (!meeting) throw new Error("No meeting found");

  return meeting;
};

export const getMeetingsForGroup = async (groupId: string) => {
  const meetings = await db.query.meetings.findMany({
    where: (meeting, { eq }) => eq(meeting.groupId, groupId),
    orderBy: (meeting, { asc }) => [asc(meeting.date)],
    with: {
      scheduleItem: true,
    },
  });

  if (meetings.length === 0) throw new Error("No meetings found");

  return meetings;
};

export const getMeetingsForAttendance = async (groupId: string) => {
  const upcomingMeetingDate = new Date();
  upcomingMeetingDate.setDate(upcomingMeetingDate.getDate() + 7);

  const meetings = await db.query.meetings.findMany({
    where: (meetings, { eq }) =>
      and(
        eq(meetings.groupId, groupId),
        lte(meetings.date, upcomingMeetingDate.toDateString()),
      ),
    with: {
      scheduleItem: true,
    },
  });

  if (meetings.length === 0) throw new Error("No meetings found");

  return meetings;
};

export const getTasksForMeeting = async (scheduleItemId: string) => {
  const tasks = await db.query.tasks.findMany({
    where: (task, { eq }) => eq(task.scheduleItemId, scheduleItemId),
    orderBy: (task, { asc }) => [asc(task.id)],
  });

  return tasks;
};

export const getParticipantsWithAttendanceByGroup = async (groupId: string) => {
  const participants = await db.query.participants.findMany({
    where: (participant, { eq }) => eq(participant.groupId, groupId),
    columns: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    },
    with: {
      attendance: {
        columns: { id: true },
        with: {
          meeting: {
            columns: {
              id: true,
              date: true,
              description: true,
            },
            with: {
              scheduleItem: true,
            },
          },
        },
      },
    },
    orderBy: (participant, { asc }) => [asc(participant.lastName)],
  });

  return participants;
};

export const getParticipantDetailsByGroup = async (groupId: string) => {
  const participants = await db.query.participants.findMany({
    where: (participant, { eq }) => eq(participant.groupId, groupId),
    columns: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    },
    with: {
      attendance: {
        columns: { id: true },
        with: {
          meeting: {
            columns: {
              id: true,
              date: true,
              description: true,
            },
            with: {
              scheduleItem: true,
            },
          },
        },
      },
      mentor: true,
    },
    orderBy: (participant, { asc }) => [asc(participant.lastName)],
  });

  return participants;
};

export const getMemoryVerseByStep = async (step: number) => {
  const verse = await db.query.verses.findFirst({
    where: (verse, { eq }) => eq(verse.step, step),
  });

  return verse;
};
