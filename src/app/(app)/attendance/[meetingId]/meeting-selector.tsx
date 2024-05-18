"use client";

import { redirect, useParams } from "next/navigation";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fixedDate } from "@/lib/utils";

const MeetingSelector = ({ meetings }) => {
  const params = useParams();
  const currentMeeting = params.meetingId;

  const handleSelect = (value: string) => {
    redirect("/attendance/" + value);
  };

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Meeting" />
      </SelectTrigger>
      <SelectContent>
        {meetings.map((meeting) => (
          <SelectItem key={meeting.id} value={meeting.id}>
            {fixedDate(meeting.date).toLocaleDateString("en-US", {
              dateStyle: "long",
            })}{" "}
            ({meeting.scheduleItem.name})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default MeetingSelector;
