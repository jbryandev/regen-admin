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
import { getLeadersWithGroup } from "@/server/queries";

const LeadersPage = async () => {
  const session = await getServerAuthSession();

  let leaders = [];
  if (session?.user.role === "admin" || session?.user.role === "director") {
    leaders = await getLeadersWithGroup();
  } else {
    redirect("/");
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Leaders</h1>
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
          {leaders.map((leader) => {
            return (
              <TableRow key={leader.id}>
                <TableCell>{leader.name}</TableCell>
                <TableCell align="center" className="hidden lg:table-cell">
                  {leader.gender === "male" ? "Male" : "Female"}
                </TableCell>
                <TableCell className="hidden xl:table-cell">
                  {prettyPhone(leader.phone ?? "")}
                </TableCell>
                <TableCell className="hidden xl:table-cell">
                  {leader.email}
                </TableCell>
                <TableCell align="center">
                  <Link
                    href={`/groups/${leader.group?.id}`}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "items-center gap-2",
                    )}
                  >
                    {leader.group?.name}
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

export default LeadersPage;
