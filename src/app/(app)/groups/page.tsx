import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type GroupWithDetails } from "@/lib/types";
import { cn, getCurrentMeeting, shortDate } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import {
  getCoachGroupsWithDetails,
  getGroupsWithDetails,
  getLeaderGroup,
} from "@/server/queries";

const GroupsPage = async () => {
  const session = await getServerAuthSession();

  if (session?.user.role === "leader") {
    const group = await getLeaderGroup(session?.user.id);
    redirect(`/groups/${group?.id}`);
  }

  let groups: Array<GroupWithDetails> = [];
  if (session?.user.role === ("admin" || "director")) {
    groups = await getGroupsWithDetails();
  } else if (session?.user.role === "coach") {
    groups = await getCoachGroupsWithDetails(session?.user.id);
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Groups</h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Group Name</TableHead>
            <TableHead className="hidden text-center sm:table-cell">
              Gender
            </TableHead>
            <TableHead className="hidden text-center sm:table-cell">
              Participants
            </TableHead>
            <TableHead className="hidden text-center lg:table-cell">
              Launch
            </TableHead>
            <TableHead className="hidden text-center lg:table-cell">
              Commencement
            </TableHead>
            <TableHead className="hidden text-center xl:table-cell">
              Current Step
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {groups.map((group) => {
            return (
              <TableRow key={group.id}>
                <TableCell>
                  <Link
                    href={`/groups/${group.id}`}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "items-center gap-2",
                    )}
                  >
                    {group.name}
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                </TableCell>
                <TableCell align="center" className="hidden sm:table-cell">
                  {group.gender === "male" ? "Male" : "Female"}
                </TableCell>
                <TableCell align="center" className="hidden sm:table-cell">
                  {group.participants.length}
                </TableCell>
                <TableCell align="center" className="hidden lg:table-cell">
                  {group.meetings.map((meeting) => {
                    if (meeting.scheduleItem.name.includes("Launch"))
                      return shortDate(meeting.date);
                  })}
                </TableCell>
                <TableCell align="center" className="hidden lg:table-cell">
                  {group.meetings.map((meeting) => {
                    if (meeting.scheduleItem.name.includes("Commencement"))
                      return shortDate(meeting.date);
                  })}
                </TableCell>
                <TableCell align="center" className="hidden xl:table-cell">
                  {getCurrentMeeting(group.meetings)?.scheduleItem.name}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default GroupsPage;
