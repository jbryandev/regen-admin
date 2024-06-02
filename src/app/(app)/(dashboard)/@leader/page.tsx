import parsePhoneNumberFromString from "libphonenumber-js";
import Link from "next/link";

import ChecklistCard from "@/app/(app)/(dashboard)/@leader/checklist-card";
import MemoryVerseCard from "@/app/(app)/(dashboard)/@leader/memory-verse-card";
import ThisWeekCard from "@/app/(app)/(dashboard)/@leader/this-week-card";
import AttendanceSummary from "@/components/attendance-summary";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  filterOutCancelledMeetings,
  getCurrentMeeting,
  getRecentMeetings,
} from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import {
  getLeaderGroup,
  getMeetingsForGroup,
  getParticipantsWithAttendanceByGroup,
  getTasksForMeeting,
} from "@/server/queries";

const LeaderDashboard = async () => {
  const session = await getServerAuthSession();

  const group = await getLeaderGroup(session?.user.id ?? "");

  const meetings = await getMeetingsForGroup(group?.id ?? "");

  const meetingsHeld = filterOutCancelledMeetings(meetings);

  const recentMeetings = getRecentMeetings(meetingsHeld);

  const currentWeek = getCurrentMeeting(meetings);

  const tasks = await getTasksForMeeting(currentWeek?.scheduleItem.id ?? "");

  const participants = await getParticipantsWithAttendanceByGroup(
    group?.id ?? "",
  );

  return (
    <>
      <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 md:gap-8 xl:grid-cols-4">
        <ThisWeekCard currentWeek={currentWeek} />
        <ChecklistCard tasks={tasks} />
        <MemoryVerseCard step={currentWeek?.scheduleItem.step ?? 0} />
      </div>
      <Card>
        <CardHeader>
          <div className="grid items-center justify-between gap-4 sm:grid-cols-2">
            <CardTitle className="text-xl">Group Summary</CardTitle>
            <div className="flex gap-2 sm:justify-end">
              <Link
                href={`/attendance/${currentWeek?.id}`}
                className={buttonVariants({ variant: "secondary" })}
              >
                Take Attendance
              </Link>
              <Link
                href={`/groups/${group?.id}`}
                className={buttonVariants({ variant: "default" })}
              >
                Group Details
              </Link>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead className="hidden lg:table-cell">Email</TableHead>
                <TableHead className="hidden lg:table-cell">Phone</TableHead>
                <TableHead>Form</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {participants.map((participant) => {
                return (
                  <TableRow key={participant.id}>
                    <TableCell>{participant.firstName}</TableCell>
                    <TableCell>{participant.lastName}</TableCell>
                    <TableCell className="hidden lg:table-cell">
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

export default LeaderDashboard;
