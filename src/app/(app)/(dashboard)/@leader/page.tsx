import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import parsePhoneNumberFromString from "libphonenumber-js";
import Link from "next/link";
import { redirect } from "next/navigation";

import AttendanceSummary from "@/app/(app)/(dashboard)/@leader/attendance-summary";
import ChecklistCard from "@/app/(app)/(dashboard)/@leader/checklist-card";
import MemoryVerseCard from "@/app/(app)/(dashboard)/@leader/memory-verse-card";
import ThisWeekCard from "@/app/(app)/(dashboard)/@leader/this-week-card";
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
import { fixedDate } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";

const LeaderDashboard = async () => {
  const session = await getServerAuthSession();

  dayjs.extend(utc);

  const leader = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.id, session?.user.id ?? ""),
    with: {
      groups: {
        columns: {
          groupId: true,
        },
        limit: 1,
      },
    },
  });

  const group = await db.query.groups.findFirst({
    where: (group, { eq }) => eq(group.id, leader?.groups[0]?.groupId ?? ""),
  });

  const meetings = await db.query.meetings.findMany({
    where: (meeting, { eq }) => eq(meeting.groupId, group?.id ?? ""),
    orderBy: (meeting, { asc }) => [asc(meeting.date)],
    with: {
      scheduleItem: {
        with: {
          tasks: true,
        },
      },
    },
  });

  const meetingsHeld = meetings.filter(
    (meeting) => !meeting.scheduleItem.isCancelled === true,
  );

  const recentMeetings = meetingsHeld
    .filter((meeting) => fixedDate(meeting.date) < new Date())
    .slice(-3)
    .map((meeting) => meeting.date);

  const currentWeek = meetings.find(
    (meeting) =>
      fixedDate(meeting.date) > fixedDate(recentMeetings.slice(-1)[0] ?? ""),
  );

  const participants = await db.query.participants.findMany({
    where: (participant, { eq }) => eq(participant.groupId, group?.id ?? ""),
    columns: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    },
    with: {
      attendance: {
        columns: { id: true },
        with: {
          meeting: {
            columns: {
              id: true,
              date: true,
              description: true,
            },
            with: {
              scheduleItem: true,
            },
          },
        },
      },
    },
    orderBy: (participant, { asc }) => [asc(participant.lastName)],
  });

  return (
    <>
      <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 md:gap-8 xl:grid-cols-4">
        <ThisWeekCard currentWeek={currentWeek} />
        <ChecklistCard tasks={currentWeek?.scheduleItem.tasks} />
        <MemoryVerseCard step={currentWeek?.scheduleItem.step ?? 0} />
      </div>
      <Card>
        <CardHeader>
          <div className="grid items-center justify-between gap-4 sm:grid-cols-2">
            <CardTitle className="text-xl">Group Summary</CardTitle>
            <div className="flex gap-2 sm:justify-end">
              <Link
                href={`/groups/${group?.slug}/meetings/${currentWeek?.slug}`}
                className={buttonVariants({ variant: "secondary" })}
              >
                Take Attendance
              </Link>
              <Link
                href={`/groups/${group?.slug}`}
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
