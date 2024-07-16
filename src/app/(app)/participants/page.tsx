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
import { cn, prettyPhone } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import {
  getCoachParticipantsWithGroup,
  getParticipantsWithGroup,
} from "@/server/queries";

const ParticipantsPage = async () => {
  const session = await getServerAuthSession();
  if (!session) redirect("/");

  let participants = [];
  if (session.user.role === "admin" || session.user.role === "director") {
    participants = await getParticipantsWithGroup();
  } else if (session?.user.role === "coach") {
    participants = await getCoachParticipantsWithGroup(session.user.id);
  } else {
    redirect("/");
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Participants</h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead className="hidden text-center lg:table-cell">
              Gender
            </TableHead>
            <TableHead className="hidden xl:table-cell">Phone</TableHead>
            <TableHead className="hidden xl:table-cell">Email</TableHead>
            <TableHead className="text-center">Group</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {participants.map((participant) => {
            return (
              <TableRow key={participant.id}>
                <TableCell>{participant.firstName}</TableCell>
                <TableCell>{participant.lastName}</TableCell>
                <TableCell align="center" className="hidden lg:table-cell">
                  {participant.gender === "male" ? "Male" : "Female"}
                </TableCell>
                <TableCell className="hidden xl:table-cell">
                  {prettyPhone(participant.phone ?? "")}
                </TableCell>
                <TableCell className="hidden xl:table-cell">
                  {participant.email}
                </TableCell>
                <TableCell align="center">
                  <Link
                    href={`/groups/${participant.groupId}`}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "items-center gap-2",
                    )}
                  >
                    {participant.group?.name}
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default ParticipantsPage;
