import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import weekday from "dayjs/plugin/weekday";
import { type z } from "zod";

import { ColoredDot } from "@/components/colored-dot";
import {
  type attendanceSchema,
  type meetingSchema,
} from "@/server/db/schema/app";

type Attendance = Pick<z.infer<typeof attendanceSchema>, "id">;
type Meeting = Pick<
  z.infer<typeof meetingSchema>,
  "id" | "date" | "description"
>;
type AttendanceWithMeetings = Array<
  Attendance & {
    meeting: Meeting;
  }
>;

const AttendanceSummary = ({
  attendance,
}: {
  attendance: AttendanceWithMeetings;
}) => {
  dayjs.extend(weekday);
  dayjs.extend(utc);
  const lastMonday = dayjs().day(1);

  const recentMeetings = [
    lastMonday.subtract(14, "days").format("MM/DD/YYYY"),
    lastMonday.subtract(7, "days").format("MM/DD/YYYY"),
    lastMonday.format("MM/DD/YYYY"),
  ];

  const recentAttendance = attendance
    .slice(-3)
    .map((attendance) =>
      dayjs(attendance.meeting.date).utc().format("MM/DD/YYYY"),
    );

  const present = recentMeetings.map((meeting) => {
    if (recentAttendance.includes(meeting)) {
      return true;
    } else {
      return false;
    }
  });

  return (
    <div className="flex gap-1">
      {present.map((wasPresent, index) =>
        wasPresent ? (
          <ColoredDot key={index} />
        ) : (
          <ColoredDot key={index} variant="red" />
        ),
      )}
    </div>
  );
};

export default AttendanceSummary;
