import { and } from "drizzle-orm";

import AttendanceButton from "@/app/(app)/attendance/[meetingId]/attendance-button";
import { type MeetingWithScheduleItem } from "@/lib/types";
import { db } from "@/server/db";

const Attendance = async ({
  meeting,
}: {
  meeting: MeetingWithScheduleItem;
}) => {
  const participants = await db.query.participants.findMany({
    where: (participant, { eq }) => eq(participant.groupId, meeting.groupId),
    columns: {
      id: true,
      firstName: true,
      lastName: true,
    },
  });

  return meeting.scheduleItem.isCancelled ? (
    <p>This meeting was cancelled. Attendance is not needed.</p>
  ) : (
    <div className="flex flex-col gap-3">
      {participants?.map(async (participant) => {
        const present = Boolean(
          await db.query.attendance.findFirst({
            where: (attendance, { eq }) =>
              and(
                eq(attendance.participantId, participant.id),
                eq(attendance.meetingId, meeting.id),
              ),
          }),
        );

        return (
          <AttendanceButton
            key={participant.id}
            participant={participant}
            meeting={meeting}
            present={present}
          />
        );
      })}
    </div>
  );
};

export default Attendance;
