"use client";

import { Circle, CircleCheck, Loader2 } from "lucide-react";
import { useTransition } from "react";
import { type z } from "zod";

import { type MeetingWithScheduleItem } from "@/app/(app)/attendance/[meetingId]/attendance";
import {
  addAttendance,
  deleteAttendance,
} from "@/app/(app)/attendance/[meetingId]/attendance-actions";
import { Button } from "@/components/ui/button";
import { type participantSchema } from "@/server/db/schema/app";

export type Participant = Pick<
  z.infer<typeof participantSchema>,
  "id" | "firstName" | "lastName"
>;

const AttendanceButton = ({
  participant,
  meeting,
  present,
}: {
  participant: Participant;
  meeting: MeetingWithScheduleItem;
  present: boolean;
}) => {
  const [isPending, startTransition] = useTransition();

  const participantName = `${participant.firstName} ${participant.lastName}`;

  const handleClick = () => {
    startTransition(async () => {
      present
        ? await deleteAttendance(meeting, participant)
        : await addAttendance(meeting, participant);
    });
  };

  return (
    <Button
      variant={present ? "default" : "outline"}
      className="flex items-center justify-between py-8"
      onClick={handleClick}
      disabled={isPending}
    >
      {participantName}
      {isPending ? (
        <Loader2 className="h-5 w-5 animate-spin" />
      ) : present ? (
        <CircleCheck className="h-5 w-5" />
      ) : (
        <Circle className="h-5 w-5" />
      )}
    </Button>
  );
};

export default AttendanceButton;
