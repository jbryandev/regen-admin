"use client";

import { Circle, CircleCheck } from "lucide-react";
import { useOptimistic } from "react";

import {
  addAttendance,
  deleteAttendance,
} from "@/app/(app)/groups/[groupId]/attendance/[meetingId]/attendance-actions";
import { Button } from "@/components/ui/button";
import { type Participant, type MeetingWithScheduleItem } from "@/lib/types";

const AttendanceButton = ({
  participant,
  meeting,
  present,
}: {
  participant: Pick<Participant, "id" | "firstName" | "lastName">;
  meeting: MeetingWithScheduleItem;
  present: boolean;
}) => {
  const [optimisticPresent, setOptimisticPresent] = useOptimistic(
    present,
    (_, newPresent: boolean) => newPresent,
  );

  const participantName = `${participant.firstName} ${participant.lastName}`;

  const handleClick = async () => {
    setOptimisticPresent(!present);
    present
      ? await deleteAttendance(meeting, participant)
      : await addAttendance(meeting, participant);
  };

  return (
    <Button
      variant={optimisticPresent ? "default" : "outline"}
      className="flex items-center justify-between py-8"
      onClick={handleClick}
    >
      {participantName}
      {optimisticPresent ? (
        <CircleCheck className="h-5 w-5" />
      ) : (
        <Circle className="h-5 w-5" />
      )}
    </Button>
  );
};

export default AttendanceButton;
