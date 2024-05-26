import { and, lte } from "drizzle-orm";

import Attendance from "@/app/(app)/groups/[groupSlug]/meetings/[meetingSlug]/attendance";
import MeetingSelector from "@/app/(app)/groups/[groupSlug]/meetings/[meetingSlug]/meeting-selector";
import { fixedDate } from "@/lib/utils";
import { db } from "@/server/db";

const AttendancePage = async ({
  params,
}: {
  params: { meetingSlug: string };
}) => {
  const currentMeeting = await db.query.meetings.findFirst({
    where: (meeting, { eq }) => eq(meeting.slug, params.meetingSlug),
    with: {
      scheduleItem: {
        columns: {
          name: true,
          isCancelled: true,
        },
      },
      group: {
        columns: {
          slug: true,
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
      group: {
        columns: {
          slug: true,
        },
      },
    },
  });

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">
            {currentMeeting?.scheduleItem.name}
          </h1>
          <p className="text-sm text-muted-foreground md:text-base">
            {fixedDate(currentMeeting?.date ?? "").toLocaleDateString("en-US", {
              dateStyle: "long",
            })}
          </p>
        </div>
        <MeetingSelector meetings={meetings} />
      </div>
      {currentMeeting && <Attendance meeting={currentMeeting} />}
    </main>
  );
};

export default AttendancePage;
