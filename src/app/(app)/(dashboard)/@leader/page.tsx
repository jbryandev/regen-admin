import parsePhoneNumberFromString from "libphonenumber-js";
import { BookOpen, Circle, ListChecks } from "lucide-react";

import AttendanceSummary from "@/app/(app)/(dashboard)/@leader/attendance";
import ThisWeekCard from "@/app/(app)/(dashboard)/@leader/this-week-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";

const LeaderDashboard = async () => {
  const session = await getServerAuthSession();
  if (!session) {
    throw new Error("No active leader session");
  }

  const leader = await db.query.users.findFirst({
    where: (user, { eq }) => eq(user.id, session.user.id),
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
          },
        },
      },
    },
    orderBy: (participant, { asc }) => [asc(participant.firstName)],
  });

  return (
    <>
      <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 md:gap-8 xl:grid-cols-4">
        <ThisWeekCard group={group} />
        <Card className="order-3 col-span-2 flex flex-col justify-between xl:order-2">
          <CardHeader className="flex-none">
            <CardDescription className="flex flex-row items-center justify-between space-y-0">
              Checklist
              <ListChecks className="h-4 w-4 text-muted-foreground" />
            </CardDescription>
          </CardHeader>
          <CardContent className="grow">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  </TableCell>
                  <TableCell>Send mentor communication for Step 4</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  </TableCell>
                  <TableCell>
                    Pray for openness in participants&apos; hearts for the Holy
                    Spirit
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  </TableCell>
                  <TableCell>
                    Have group watch second inventory traning video
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Button variant={"secondary"} className="w-full">
              See all tasks
            </Button>
          </CardFooter>
        </Card>
        <Card className="order-3 flex flex-col justify-between sm:order-2">
          <CardHeader className="flex-none">
            <CardDescription className="flex flex-row items-center justify-between space-y-0">
              Memory Verse
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardDescription>
            <CardTitle className="text-xl">Psalm 51:6</CardTitle>
          </CardHeader>
          <CardContent className="grow text-sm text-muted-foreground">
            <p>
              Behold, you delight in truth in the inward being, and you teach me
              wisdom in the secret heart.
            </p>
          </CardContent>
        </Card>
      </div>{" "}
      <Card>
        <CardHeader>
          <div className="grid items-center justify-between gap-4 sm:grid-cols-2">
            <CardTitle className="text-xl">Group Summary</CardTitle>
            <div className="flex gap-2 sm:justify-end">
              <Button variant={"secondary"}>Take Attendance</Button>
              <Button>Group Details</Button>
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
                      <AttendanceSummary attendance={participant.attendance} />
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
