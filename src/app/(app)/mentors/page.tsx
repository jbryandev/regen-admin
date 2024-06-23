import { redirect } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prettyPhone } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { getMentors } from "@/server/queries";

const MentorsPage = async () => {
  const session = await getServerAuthSession();

  let mentors = [];
  if (session?.user.role === "admin" || session?.user.role === "director") {
    mentors = await getMentors();
  } else {
    redirect("/");
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Mentors</h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead className="hidden xl:table-cell">Phone</TableHead>
            <TableHead className="hidden xl:table-cell">Email</TableHead>
            <TableHead>Mentee(s)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mentors.map((mentor) => {
            return (
              <TableRow key={mentor.id}>
                <TableCell>{mentor.firstName}</TableCell>
                <TableCell>{mentor.lastName}</TableCell>
                <TableCell className="hidden xl:table-cell">
                  {prettyPhone(mentor.phone ?? "")}
                </TableCell>
                <TableCell className="hidden xl:table-cell">
                  {mentor.email}
                </TableCell>
                <TableCell>
                  {mentor.participants.map((mentee) => (
                    <div key={mentee.id}>
                      {mentee.firstName} {mentee.lastName}
                    </div>
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

export default MentorsPage;
