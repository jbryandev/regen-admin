import { and, eq, lte } from "drizzle-orm";
import { type z } from "zod";

import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { type userProfileSchema, users } from "@/server/db/schema/auth";

import "server-only";

/**
 *
 * Users
 *
 */
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

/**
 *
 * Leaders
 *
 */
export const getLeaders = async () => {
  const leaders = await db
    .select({
      id: users.id,
      name: users.name,
      gender: users.gender,
      email: users.email,
      phone: users.phone,
    })
    .from(users)
    .where(eq(users.role, "leader"));
  return leaders;
};

export const getLeadersWithGroup = async () => {
  const leaders = await db.query.users.findMany({
    where: (user, { eq }) => eq(user.role, "leader"),
    columns: {
      id: true,
      name: true,
      gender: true,
      email: true,
      phone: true,
    },
    with: {
      groups: true,
    },
    orderBy: (leader, { asc }) => [asc(leader.name)],
  });

  const groups = await db.query.groups.findMany({
    columns: {
      id: true,
      name: true,
    },
  });

  const leadersWithGroup = leaders.map((leader) => {
    const group = groups.find(
      (group) => group.id === leader.groups[0]?.groupId ?? "",
    );
    return { ...leader, group };
  });

  return leadersWithGroup;
};

export const getLeadersFromGroup = async (groupId: string) => {
  const leaders = await db.query.usersToGroups.findMany({
    where: (group, { eq }) => eq(group.groupId, groupId),
    columns: {
      userId: true,
    },
  });

  if (leaders.length === 0) throw new Error("No leaders found");

  return leaders;
};

/**
 *
 * Coaches
 *
 */
export const getCoaches = async () => {
  const coaches = await db.query.users.findMany({
    where: (user, { eq }) => eq(user.role, "coach"),
    columns: {
      id: true,
      name: true,
    },
  });

  return coaches;
};

export const getCoachesWithGroups = async () => {
  const coaches = await db.query.users.findMany({
    where: (user, { eq }) => eq(user.role, "coach"),
    columns: {
      id: true,
      name: true,
      gender: true,
      email: true,
      phone: true,
    },
    with: {
      groups: true,
    },
    orderBy: (coach, { asc }) => [asc(coach.name)],
  });

  const groups = await db.query.groups.findMany({
    columns: {
      id: true,
      name: true,
    },
  });

  const coachesWithGroups = coaches.map((coach) => {
    const coachGroups = coach.groups.map((group) =>
      groups.find((g) => g.id === group.groupId),
    );
    return { ...coach, groups: coachGroups };
  });

  return coachesWithGroups;
};

export const getCoachGroups = async (coachId: string) => {
  const groups = await db.query.usersToGroups.findMany({
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

  if (groups.length === 0) throw new Error("No coach groups found");

  return groups;
};

export const getCoachGroupsWithDetails = async (coachId: string) => {
  const groups = await db.query.usersToGroups.findMany({
    where: (group, { eq }) => eq(group.userId, coachId),
    columns: {
      groupId: true,
    },
  });

  if (groups.length === 0) throw new Error("No coach groups found");

  const groupIds = groups
    .map((group) => group.groupId)
    .filter((groupId) => groupId != null);

  const groupsWithDetails = await db.query.groups.findMany({
    where: (group, { inArray }) => inArray(group.id, groupIds),
    columns: {
      id: true,
      name: true,
      gender: true,
    },
    with: {
      meetings: {
        columns: {
          date: true,
        },
        with: {
          scheduleItem: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
      },
      participants: {
        columns: {
          id: true,
        },
      },
    },
    orderBy: (group, { asc }) => [asc(group.name)],
  });

  return groupsWithDetails;
};

export const getCoachDashboardStats = async (coachId: string) => {
  const groups = await db.query.usersToGroups.findMany({
    where: (group, { eq }) => eq(group.userId, coachId),
    columns: {
      groupId: true,
    },
  });

  const groupIds = groups
    .map((group) => group.groupId)
    .filter((groupId) => groupId != null);

  const leaders = await db.query.usersToGroups.findMany({
    where: (group, { inArray }) => inArray(group.groupId, groupIds),
    columns: {
      userId: true,
    },
  });

  const leaderIds = leaders
    .filter((leader) => leader.userId != coachId)
    .map((leader) => leader.userId);

  const participants = await db.query.participants.findMany({
    where: (participant, { inArray }) => inArray(participant.groupId, groupIds),
    columns: {
      id: true,
      mentorId: true,
    },
  });

  const participantIds = participants.map((participant) => participant.id);

  const mentorIds = participants.map((participant) => participant.mentorId);

  return {
    groupIds,
    leaderIds,
    participantIds,
    mentorIds,
  };
};

export const getCoachLeaders = async (coachId: string) => {
  const leaders = await db.query.usersToGroups.findMany({
    where: (group, { eq }) => eq(group.userId, coachId),
    columns: {
      userId: true,
    },
    with: {
      user: {
        columns: {
          id: true,
          name: true,
          image: true,
          email: true,
          phone: true,
          role: true,
        },
      },
    },
  });

  return leaders;
};

/**
 *
 * Groups
 *
 */
export const getGroups = async () => {
  const groups = await db.query.groups.findMany();
  return groups;
};

export const getGroupsWithDetails = async () => {
  const groups = await db.query.groups.findMany({
    columns: {
      id: true,
      name: true,
      gender: true,
    },
    with: {
      meetings: {
        columns: {
          date: true,
        },
        with: {
          scheduleItem: {
            columns: {
              id: true,
              name: true,
            },
          },
        },
      },
      participants: {
        columns: {
          id: true,
        },
      },
    },
    orderBy: (group, { asc }) => [asc(group.name)],
  });
  return groups;
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

export const getGroupLeadership = async (groupId: string) => {
  const leadership = await db.query.usersToGroups.findMany({
    where: (group, { eq }) => eq(group.groupId, groupId),
    columns: {
      userId: true,
    },
    with: {
      user: {
        columns: {
          id: true,
          name: true,
          image: true,
          email: true,
          phone: true,
          role: true,
        },
      },
    },
  });

  if (leadership.length === 0) throw new Error("No leaders found");

  const leaders = leadership
    .filter((leader) => leader?.user?.role === "leader")
    .map((leader) => leader.user);

  const coaches = leadership
    .filter((coach) => coach?.user?.role != "leader")
    .map((coach) => coach.user);

  return { leaders, coaches };
};

export const getMemoryVerseByStep = async (step: number) => {
  const verse = await db.query.verses.findFirst({
    where: (verse, { eq }) => eq(verse.step, step),
  });

  return verse;
};

/**
 *
 * Meetings
 *
 */
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

/**
 *
 * Participants
 *
 */
export const getParticipants = async () => {
  const participants = await db.query.participants.findMany();
  return participants;
};

export const getParticipantsWithGroup = async () => {
  const participants = await db.query.participants.findMany({
    with: {
      group: true,
    },
    orderBy: (participant, { asc }) => [asc(participant.lastName)],
  });
  return participants;
};

export const getMaleParticipantsWithGroup = async () => {
  const participants = await db.query.participants.findMany({
    where: (participant, { eq }) => eq(participant.gender, "male"),
    with: {
      group: true,
    },
  });
  return participants;
};

export const getFemaleParticipantsWithGroup = async () => {
  const participants = await db.query.participants.findMany({
    where: (participant, { eq }) => eq(participant.gender, "female"),
    with: {
      group: true,
    },
  });
  return participants;
};

export const getMentors = async () => {
  const mentors = await db.query.mentors.findMany({
    orderBy: (mentor, { asc }) => [asc(mentor.lastName)],
    with: {
      participants: true,
    },
  });
  return mentors;
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
