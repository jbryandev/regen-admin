"use client";

import { Circle, CircleCheck } from "lucide-react";
import { type z } from "zod";

import {
  markNotPresent,
  markPresent,
} from "@/app/(app)/attendance/[meetingId]/_components/attendance-actions";
import { Button } from "@/components/ui/button";
import {
  type meetingSchema,
  type attendanceSchema,
  type participantSchema,
} from "@/server/db/schema/app";

type Participant = z.infer<typeof participantSchema>;
type Attendance = z.infer<typeof attendanceSchema>;
type ParticipantAttendance = Participant & {
  attendance: Attendance[];
};
type Meeting = z.infer<typeof meetingSchema>;

const CheckInButton = ({
  participant,
  meeting,
}: {
  participant: ParticipantAttendance;
  meeting: Meeting;
}) => {
  const present = participant.attendance.find(
    (attendance) => attendance.meetingId === meeting?.id,
  );

  const handleClick = async () => {
    if (present) {
      await markNotPresent(meeting, participant);
    } else {
      await markPresent(meeting, participant);
    }
  };

  return (
    <Button
      formAction={handleClick}
      variant={present ? "default" : "outline"}
      size={"xl"}
      className="flex items-center justify-between"
    >
      <span>
        {participant.firstName} {participant.lastName}
      </span>
      {present ? (
        <CircleCheck className="h-5 w-5" />
      ) : (
        <Circle className="h-5 w-5" />
      )}
    </Button>
  );
};

export default CheckInButton;
