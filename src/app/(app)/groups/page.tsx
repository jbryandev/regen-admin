import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, getCurrentMeeting, shortDate } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { getGroupsWithDetails, getLeaderGroup } from "@/server/queries";

const GroupsPage = async () => {
  const session = await getServerAuthSession();

  if (session?.user.role === "leader") {
    const group = await getLeaderGroup(session?.user.id);
    redirect(`/groups/${group?.id}`);
  }

  const groups = await getGroupsWithDetails();

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Groups</h1>
      </div>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="hidden sm:table-cell">Gender</TableHead>
                <TableHead className="hidden xl:table-cell">Leaders</TableHead>
                <TableHead className="hidden xl:table-cell">
                  Participants
                </TableHead>
                <TableHead className="hidden lg:table-cell">Launch</TableHead>
                <TableHead className="hidden lg:table-cell">
                  Commencement
                </TableHead>
                <TableHead className="hidden xl:table-cell">
                  Current Step
                </TableHead>
                <TableHead className="text-center">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groups.map((group) => {
                return (
                  <TableRow key={group.id}>
                    <TableCell>{group.name}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      {group.gender}
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      {group.users.map((user) => {
                        if (user.user?.role === "leader")
                          return <div key={user.id}>{user.user?.name}</div>;
                      })}
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      {group.participants.length}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {group.meetings.map((meeting) => {
                        console.log(meeting.scheduleItem.name);
                        if (meeting.scheduleItem.name.includes("Launch"))
                          return shortDate(meeting.date);
                      })}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {group.meetings.map((meeting) => {
                        if (meeting.scheduleItem.name.includes("Commencement"))
                          return shortDate(meeting.date);
                      })}
                    </TableCell>
                    <TableCell className="hidden xl:table-cell">
                      {getCurrentMeeting(group.meetings)?.scheduleItem.name}
                    </TableCell>
                    <TableCell align="center">
                      <Link
                        href={`/groups/${group.id}`}
                        className={cn(
                          buttonVariants({ variant: "ghost" }),
                          "items-center gap-2",
                        )}
                      >
                        Group Details
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </Link>
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
