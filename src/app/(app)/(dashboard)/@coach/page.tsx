import { HeartHandshake, Star, User, Users } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { getCoachDashboardStats } from "@/server/queries";

const CoachDashboard = async () => {
  const session = await getServerAuthSession();
  const coachId = session?.user?.id;

  if (!coachId) throw new Error("Unauthorized");

  const { groupIds, leaderIds, participantIds, mentorIds } =
    await getCoachDashboardStats(coachId);

  return (
    <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 md:gap-8 xl:grid-cols-3 2xl:grid-cols-4">
      <Card className="flex flex-col justify-between">
        <CardHeader className="flex-none">
          <CardDescription className="flex flex-row items-center justify-between space-y-0">
            Groups
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardDescription>
          <CardTitle className="text-3xl">{groupIds.length}</CardTitle>
        </CardHeader>
        <CardFooter className="flex-none gap-2">
          <Link
            href={"/groups"}
            className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
          >
            All groups
          </Link>
        </CardFooter>
      </Card>
      <Card className="flex flex-col justify-between">
        <CardHeader className="flex-none">
          <CardDescription className="flex flex-row items-center justify-between space-y-0">
            Participants
            <User className="h-4 w-4 text-muted-foreground" />
          </CardDescription>
          <CardTitle className="text-3xl">{participantIds.length}</CardTitle>
        </CardHeader>
        <CardFooter className="flex-none gap-2">
          <Link
            href={"/participants"}
            className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
          >
            All participants
          </Link>
        </CardFooter>
      </Card>
      <Card className="flex flex-col justify-between">
        <CardHeader className="flex-none">
          <CardDescription className="flex flex-row items-center justify-between space-y-0">
            Leaders
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardDescription>
          <CardTitle className="text-3xl">{leaderIds.length}</CardTitle>
        </CardHeader>
        <CardFooter className="flex-none gap-2">
          <Link
            href={"/leaders"}
            className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
          >
            All leaders
          </Link>
        </CardFooter>
      </Card>
      <Card className="flex flex-col justify-between">
        <CardHeader className="flex-none">
          <CardDescription className="flex flex-row items-center justify-between space-y-0">
            Mentors
            <HeartHandshake className="h-4 w-4 text-muted-foreground" />
          </CardDescription>
          <CardTitle className="text-3xl">{mentorIds.length}</CardTitle>
        </CardHeader>
        <CardFooter className="flex-none gap-2">
          <Link
            href={"/mentors"}
            className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
          >
            All mentors
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CoachDashboard;
