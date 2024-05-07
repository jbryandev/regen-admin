import { eq } from "drizzle-orm";
import { HeartHandshake, Star, User, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/server/db";
import { roles, users } from "@/server/db/schema/auth";

const AdminDashboard = async () => {
  const groups = await db.query.groups.findMany();
  const participants = await db.query.participants.findMany();
  const leaders = await db
    .select()
    .from(users)
    .innerJoin(roles, eq(users.roleId, roles.id))
    .where(eq(roles.name, "Leader"));

  const coaches = await db
    .select()
    .from(users)
    .innerJoin(roles, eq(users.roleId, roles.id))
    .where(eq(roles.name, "Coach"));

  return (
    <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 md:gap-8 xl:grid-cols-4">
      <Card className="flex flex-col justify-between">
        <CardHeader className="flex-none">
          <CardDescription className="flex flex-row items-center justify-between space-y-0">
            Groups
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardDescription>
          <CardTitle className="text-3xl">{groups.length}</CardTitle>
        </CardHeader>
        <CardFooter className="flex-none gap-2">
          <Button variant={"secondary"} className="w-full">
            View all groups
          </Button>
        </CardFooter>
      </Card>
      <Card className="flex flex-col justify-between">
        <CardHeader className="flex-none">
          <CardDescription className="flex flex-row items-center justify-between space-y-0">
            Participants
            <User className="h-4 w-4 text-muted-foreground" />
          </CardDescription>
          <CardTitle className="text-3xl">{participants.length}</CardTitle>
        </CardHeader>
        <CardFooter className="flex-none gap-2">
          <Button variant={"secondary"} className="w-full">
            View all participants
          </Button>
        </CardFooter>
      </Card>
      <Card className="flex flex-col justify-between">
        <CardHeader className="flex-none">
          <CardDescription className="flex flex-row items-center justify-between space-y-0">
            Leaders
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardDescription>
          <CardTitle className="text-3xl">{leaders.length}</CardTitle>
        </CardHeader>
        <CardFooter className="flex-none gap-2">
          <Button variant={"secondary"} className="w-full">
            View all leaders
          </Button>
        </CardFooter>
      </Card>
      <Card className="flex flex-col justify-between">
        <CardHeader className="flex-none">
          <CardDescription className="flex flex-row items-center justify-between space-y-0">
            Coaches
            <HeartHandshake className="h-4 w-4 text-muted-foreground" />
          </CardDescription>
          <CardTitle className="text-3xl">{coaches.length}</CardTitle>
        </CardHeader>
        <CardFooter className="flex-none gap-2">
          <Button variant={"secondary"} className="w-full">
            View all coaches
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminDashboard;
