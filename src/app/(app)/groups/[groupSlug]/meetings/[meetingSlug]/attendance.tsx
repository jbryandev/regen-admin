import { and } from "drizzle-orm";
import { type z } from "zod";

import AttendanceButton from "@/app/(app)/groups/[groupSlug]/meetings/[meetingSlug]/attendance-button";
import { db } from "@/server/db";
import {
  type groupSchema,
  type meetingSchema,
  type scheduleItemSchema,
} from "@/server/db/schema/app";

type Meeting = z.infer<typeof meetingSchema>;
type ScheduleItem = Pick<
  z.infer<typeof scheduleItemSchema>,
  "name" | "isCancelled"
>;
type Group = Pick<z.infer<typeof groupSchema>, "slug">;

export type MeetingWithScheduleItemAndGroupSlug = Meeting & {
  scheduleItem: ScheduleItem;
  group: Group;
};

const Attendance = async ({
  meeting,
}: {
  meeting: MeetingWithScheduleItemAndGroupSlug;
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
