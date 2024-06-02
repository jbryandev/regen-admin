"use client";

import { redirect, useParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type MeetingWithScheduleItem } from "@/lib/types";
import { fixedDate } from "@/lib/utils";

const MeetingSelector = ({
  meetings,
}: {
  meetings: MeetingWithScheduleItem[];
}) => {
  const params = useParams();

  const activeMeeting = meetings.find(
    (meeting) => params.meetingId === meeting.id,
  );

  const handleSelect = (value: string) => {
    redirect(`/attendance/${value}`);
  };

  return (
    <Select onValueChange={handleSelect} defaultValue={activeMeeting?.id}>
      <SelectTrigger className="max-w-64">
        <SelectValue placeholder="Select a meeting" />
      </SelectTrigger>
      <SelectContent>
        {meetings.map((meeting) => (
          <SelectItem key={meeting.id} value={meeting.id}>
            {fixedDate(meeting.date).toLocaleDateString()} (
            {meeting.scheduleItem.name})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default MeetingSelector;
