import dayjs from "dayjs";
import { type z } from "zod";

import { ColoredDot } from "@/components/colored-dot";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { fixedDate } from "@/lib/utils";
import {
  type scheduleItemSchema,
  type attendanceSchema,
  type meetingSchema,
} from "@/server/db/schema/app";

type Attendance = Pick<z.infer<typeof attendanceSchema>, "id">;

type Meeting = Pick<
  z.infer<typeof meetingSchema>,
  "id" | "date" | "description"
>;

type ScheduleItem = z.infer<typeof scheduleItemSchema>;

type CombinedAttendance = Array<
  Attendance & {
    meeting: Meeting & {
      scheduleItem: ScheduleItem;
    };
  }
>;

const AttendanceSummary = ({
  attendance,
  recentMeetings,
}: {
  attendance: CombinedAttendance;
  recentMeetings: string[];
}) => {
  const attendedDates = attendance.map((attendance) => attendance.meeting.date);

  const wasPresent = recentMeetings.map((meeting) => {
    if (attendedDates.includes(meeting)) {
      return { present: true, date: meeting };
    } else {
      return { present: false, date: meeting };
    }
  });

  return (
    <div className="flex gap-1">
      <TooltipProvider>
        {wasPresent.map((meeting, index) => (
          <Tooltip key={index}>
            <TooltipTrigger asChild>
              {meeting.present ? (
                <ColoredDot />
              ) : (
                <ColoredDot key={index} variant="red" />
              )}
            </TooltipTrigger>
            <TooltipContent>
              {fixedDate(meeting.date).toLocaleDateString()}
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};

export default AttendanceSummary;
