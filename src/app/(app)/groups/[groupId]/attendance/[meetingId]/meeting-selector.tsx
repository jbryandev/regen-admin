"use client";

import { Calendar, ChevronDown } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type MeetingWithScheduleItem } from "@/lib/types";
import { longDate, shortDate } from "@/lib/utils";

const MeetingSelector = ({
  meetings,
}: {
  meetings: MeetingWithScheduleItem[];
}) => {
  const { groupId, meetingId } = useParams();
  const router = useRouter();

  const activeMeeting = meetings.find((meeting) => meetingId === meeting.id);

  const handleSelect = (value: string) => {
    router.push(`/groups/${groupId?.toString()}/attendance/${value}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex items-center gap-2 text-sm font-normal text-muted-foreground md:text-base"
        >
          <Calendar className="h-4 w-4" />
          {longDate(activeMeeting?.date ?? "")}
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {meetings.map((meeting) => (
          <DropdownMenuCheckboxItem
            key={meeting.id}
            checked={meeting.id === activeMeeting?.id}
            onSelect={() => handleSelect(meeting.id)}
          >
            {shortDate(meeting.date)} - {meeting.scheduleItem.name}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MeetingSelector;
