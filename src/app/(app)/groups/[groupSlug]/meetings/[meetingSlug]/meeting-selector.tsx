"use client";

import { redirect, useParams } from "next/navigation";

import { type MeetingWithScheduleItemAndGroupSlug } from "@/app/(app)/groups/[groupSlug]/meetings/[meetingSlug]/attendance";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fixedDate } from "@/lib/utils";

const MeetingSelector = ({
  meetings,
}: {
  meetings: MeetingWithScheduleItemAndGroupSlug[];
}) => {
  const params = useParams();

  const activeMeeting = meetings.find(
    (meeting) => params.meetingSlug === meeting.slug,
  );

  const handleSelect = (value: string) => {
    redirect(`/groups/${activeMeeting?.group.slug}/meetings/${value}`);
  };

  return (
    <Select onValueChange={handleSelect} defaultValue={activeMeeting?.slug}>
      <SelectTrigger className="max-w-64">
        <SelectValue placeholder="Select a meeting" />
      </SelectTrigger>
      <SelectContent>
        {meetings.map((meeting) => (
          <SelectItem key={meeting.id} value={meeting.slug}>
            {fixedDate(meeting.date).toLocaleDateString()} (
            {meeting.scheduleItem.name})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default MeetingSelector;
