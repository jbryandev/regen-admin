import { and, lte } from "drizzle-orm";
import { redirect } from "next/navigation";

import Attendance from "@/app/(app)/attendance/[meetingId]/attendance";
import MeetingSelector from "@/app/(app)/attendance/[meetingId]/meeting-selector";
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

  const currentMeeting = await db.query.meetings.findFirst({
    where: (meeting, { eq }) => eq(meeting.id, params.meetingId),
    with: {
      scheduleItem: {
        columns: {
          name: true,
          isCancelled: true,
        },
      },
    },
  });

  const upcomingMeetingDate = new Date();
  upcomingMeetingDate.setDate(upcomingMeetingDate.getDate() + 7);

  const meetings = await db.query.meetings.findMany({
    where: (meetings, { eq }) =>
      and(
        eq(meetings.groupId, currentMeeting?.groupId ?? ""),
        lte(meetings.date, upcomingMeetingDate.toDateString()),
      ),
    with: {
      scheduleItem: {
        columns: {
          name: true,
          isCancelled: true,
        },
      },
    },
  });

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">Attendance</h1>
          <p className="text-sm text-muted-foreground md:text-base">
            {currentMeeting?.scheduleItem.name}
          </p>
        </div>
        <MeetingSelector meetings={meetings} />
      </div>
      {currentMeeting && <Attendance meeting={currentMeeting} />}
    </main>
  );
};

export default AttendancePage;
