import parsePhoneNumberFromString from "libphonenumber-js";
import Link from "next/link";

import AttendanceSummary from "@/components/attendance-summary";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getCurrentMeeting, getRecentMeetings } from "@/lib/utils";
import {
  getMeetingsForGroup,
  getParticipantDetailsByGroup,
} from "@/server/queries";

const GroupsPage = async ({ params }: { params: { groupId: string } }) => {
  const meetings = await getMeetingsForGroup(params.groupId);
  const recentMeetings = getRecentMeetings(meetings);
  const currentMeeting = getCurrentMeeting(meetings);
  const participants = await getParticipantDetailsByGroup(params.groupId);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Group Details</h1>
        <Link
          href={`/attendance/${currentMeeting?.id}`}
          className={buttonVariants({ variant: "secondary" })}
        >
          Take Attendance
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Roster</CardTitle>
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
                <TableHead className="hidden sm:table-cell">Mentor</TableHead>
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

                    <TableCell className="hidden sm:table-cell">
                      <Popover key={participant.mentor?.id}>
                        <PopoverTrigger asChild>
                          <Button variant="ghost">
                            {participant.mentor?.firstName}{" "}
                            {participant.mentor?.lastName}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <div className="grid gap-4">
                            <div className="space-y-2">
                              <h4 className="font-medium leading-none">
                                Mentor Information
                              </h4>
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  {participant.mentor?.firstName}{" "}
                                  {participant.mentor?.lastName}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {participant.mentor?.phone &&
                                    parsePhoneNumberFromString(
                                      participant.mentor?.phone,
                                      "US",
                                    )?.formatNational()}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {participant.mentor?.email}
                                </p>
                              </div>
                            </div>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
};

export default GroupsPage;
