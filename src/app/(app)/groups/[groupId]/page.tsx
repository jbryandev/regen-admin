import parsePhoneNumberFromString from "libphonenumber-js";
import { CalendarDays, ChevronDown, Mail, Phone } from "lucide-react";
import Link from "next/link";

import CoachCard from "@/app/(app)/groups/[groupId]/coach-card";
import LeaderCard from "@/app/(app)/groups/[groupId]/leader-card";
import AttendanceSummary from "@/components/attendance-summary";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, getCurrentMeeting, getRecentMeetings } from "@/lib/utils";
import {
  getGroupLeadership,
  getMeetingsForGroup,
  getParticipantDetailsByGroup,
} from "@/server/queries";

const GroupsPage = async ({ params }: { params: { groupId: string } }) => {
  const meetings = await getMeetingsForGroup(params.groupId);
  const recentMeetings = getRecentMeetings(meetings);
  const currentMeeting = getCurrentMeeting(meetings);
  const { leaders, coaches } = await getGroupLeadership(params.groupId);
  const participants = await getParticipantDetailsByGroup(params.groupId);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Group Details</h1>
      </div>
      <div className="grid gap-4 md:gap-8 xl:grid-cols-3">
        <LeaderCard leaders={leaders} />
        <CoachCard coaches={coaches} />
        <Card className="flex flex-col justify-between">
          <CardHeader className="flex-none">
            <CardDescription className="flex flex-row items-center justify-between space-y-0">
              Current Step
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardDescription>
            <CardTitle className="text-xl">
              {currentMeeting?.scheduleItem.name ?? "Nothing of note"}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-none gap-2">
            <Link
              href={`/groups/${params.groupId}/schedule`}
              className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
            >
              Group Schedule
            </Link>
          </CardFooter>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle className="text-xl">Roster</CardTitle>
            <Link
              href={`/groups/${params.groupId}/attendance/${currentMeeting?.id}`}
              className={buttonVariants({ variant: "secondary" })}
            >
              Take Attendance
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead className="hidden xl:table-cell">Email</TableHead>
                <TableHead className="hidden lg:table-cell">Phone</TableHead>
                <TableHead>Form</TableHead>
                <TableHead className="hidden text-center sm:table-cell">
                  Mentor
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {participants.map((participant) => {
                return (
                  <TableRow key={participant.id}>
                    <TableCell>{participant.firstName}</TableCell>
                    <TableCell>{participant.lastName}</TableCell>
                    <TableCell className="hidden xl:table-cell">
                      {participant.email}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {participant.phone &&
                        parsePhoneNumberFromString(
                          participant.phone,
                          "US",
                        )?.formatNational()}
                    </TableCell>
                    <TableCell className="flex h-[37px] items-center">
                      <AttendanceSummary
                        attendance={participant.attendance}
                        recentMeetings={recentMeetings}
                      />
                    </TableCell>
                    <TableCell align="center" className="hidden sm:table-cell">
                      {participant.mentor && (
                        <Popover key={participant.mentor?.id}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="ghost"
                              className="flex items-center justify-end gap-2"
                            >
                              <div>
                                {participant.mentor?.firstName}{" "}
                                {participant.mentor?.lastName}
                              </div>
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <div className="flex flex-col gap-1">
                              {participant.mentor?.email && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Mail className="h-4 w-4" />
                                  {participant.mentor?.email}
                                </div>
                              )}
                              {participant.mentor?.phone && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Phone className="h-4 w-4" />
                                  {participant.mentor?.phone &&
                                    parsePhoneNumberFromString(
                                      participant.mentor?.phone,
                                      "US",
                                    )?.formatNational()}
                                </div>
                              )}
                            </div>
                          </PopoverContent>
                        </Popover>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default GroupsPage;
