import { and, lte } from "drizzle-orm";
import { redirect } from "next/navigation";

import CheckInButton from "@/app/(app)/attendance/[meetingId]/_components/check-in-button";
import MeetingSelector from "@/app/(app)/attendance/[meetingId]/_components/meeting-selector";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";

const AttendancePage = async ({
  params,
}: {
  params: { meetingId: string };
}) => {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/login");
  }

  const user = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.id, session.user.id),
    with: {
      groups: true,
      role: true,
    },
  });

  const meeting = await db.query.meetings.findFirst({
    where: (meeting, { eq }) => eq(meeting.id, params.meetingId),
    with: {
      scheduleItem: true,
    },
  });

  if (
    !user?.role.isAdmin &&
    !user?.groups.some((group) => group.groupId === meeting?.groupId)
  ) {
    throw new Error("You are not assigned to this group");
  }

  const meetings = await db.query.meetings.findMany({
    where: (meetings, { eq }) =>
      and(
        eq(meetings.groupId, meeting?.groupId),
        lte(meetings.date, new Date().toDateString()),
      ),
    with: {
      scheduleItem: true,
    },
  });

  const participants = await db.query.participants.findMany({
    where: (participant, { eq }) => eq(participant.groupId, meeting?.groupId),
    columns: {
      id: true,
      firstName: true,
      lastName: true,
    },
    with: {
      attendance: {
        columns: {
          meetingId: true,
        },
      },
    },
    orderBy: (participant, { asc }) => [asc(participant.lastName)],
  });

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">Attendance</h1>
          {/* <p className="text-sm text-muted-foreground md:text-base">
            {meeting?.scheduleItem.name}
          </p> */}
          <p className="text-sm text-muted-foreground md:text-base">
            {meeting?.scheduleItem.name}
          </p>
        </div>
        <MeetingSelector meetings={meetings} />
      </div>
      <div className="flex flex-col gap-2">
        {participants.map((participant) => {
          return (
            <CheckInButton
              key={participant.id}
              participant={participant}
              meeting={meeting}
            />
          );
        })}
      </div>
    </main>
  );
};

export default AttendancePage;
