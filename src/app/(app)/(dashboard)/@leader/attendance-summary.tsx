import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
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
  recentMeetings,
}: {
  attendance: AttendanceWithMeetings;
  recentMeetings: string[];
}) => {
  dayjs.extend(utc);

  const recentAttendance = attendance
    .slice(-3)
    .map((attendance) =>
      dayjs(attendance.meeting.date).utc().format("MM/DD/YYYY"),
    );
  // console.log("recentAttendance:", recentAttendance);

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
