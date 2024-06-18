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
import { getCoachesWithGroups } from "@/server/queries";

const CoachesPage = async () => {
  const session = await getServerAuthSession();

  if (session?.user.role != "admin" && session?.user.role != "director") {
    redirect("/");
  }
  const coaches = await getCoachesWithGroups();

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Coaches</h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="hidden text-center lg:table-cell">
              Gender
            </TableHead>
            <TableHead className="hidden xl:table-cell">Phone</TableHead>
            <TableHead className="hidden xl:table-cell">Email</TableHead>
            <TableHead className="text-center">Group</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coaches.map((coach) => {
            return (
              <TableRow key={coach.id}>
                <TableCell>{coach.name}</TableCell>
                <TableCell align="center" className="hidden lg:table-cell">
                  {coach.gender === "male" ? "M" : "F"}
                </TableCell>
                <TableCell className="hidden xl:table-cell">
                  {prettyPhone(coach.phone ?? "")}
                </TableCell>
                <TableCell className="hidden xl:table-cell">
                  {coach.email}
                </TableCell>
                <TableCell align="center" className="flex-col gap-1">
                  {coach.groups.map((group) => (
                    <Link
                      key={group?.id}
                      href={`/groups/${group?.id}`}
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "items-center gap-2",
                      )}
                    >
                      {group?.name}
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </Link>
                  ))}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default CoachesPage;
