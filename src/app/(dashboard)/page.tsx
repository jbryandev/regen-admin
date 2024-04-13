import {
  ArrowUpRight,
  BookText,
  CalendarDays,
  CircleChevronRight,
  UserCheck,
  Users,
  Video,
} from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const DashboardPage = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
        <div
          className={cn(
            buttonVariants({ variant: "secondary" }),
            "cursor-default select-none",
          )}
        >
          Regen Leader
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Link href="/groups">
          <Card className="h-full">
            <CardHeader>
              <CardDescription className="flex flex-row items-center justify-between space-y-0">
                Participants
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardDescription>
              <CardTitle className="text-xl sm:text-2xl">12</CardTitle>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/schedule">
          <Card>
            <CardHeader>
              <CardDescription className="flex flex-row items-center justify-between space-y-0">
                Progress
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </CardDescription>
              <CardTitle className="text-xl sm:text-2xl">
                Step 4, Week 1
              </CardTitle>
            </CardHeader>
            <CardFooter>
              <Progress value={25} aria-label="25% complete" />
            </CardFooter>
          </Card>
        </Link>
        <Link href="/attendance">
          <Card>
            <CardHeader>
              <CardDescription className="flex flex-row items-center justify-between space-y-0">
                Attendance
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardDescription>
              <CardTitle className="text-xl sm:text-2xl">
                10 <span className="text-xs text-muted-foreground">of 12</span>
              </CardTitle>
            </CardHeader>
            <CardFooter>
              <Progress value={85} aria-label="85% attendance" />
            </CardFooter>
          </Card>
        </Link>
        <Link href="/training">
          <Card className="h-full">
            <CardHeader>
              <CardDescription className="flex flex-row items-center justify-between space-y-0">
                Watch
                <Video className="h-4 w-4 text-muted-foreground" />
              </CardDescription>
              <CardTitle className="text-xl sm:text-2xl">
                Leader Training
              </CardTitle>
            </CardHeader>
          </Card>
        </Link>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Week at a glance</CardTitle>
            <Button variant={"outline"} className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              Step 4, Week 1
            </Button>
          </CardHeader>
          <CardContent className="grid gap-8">
            <div>
              <h4 className="mb-2 text-sm font-medium leading-none">Tasks</h4>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Checkbox className="mr-2" />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      Email mentors and invite to inventory training
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      Pray for the Holy Spirit to work in the hearts of the
                      participants
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      Email mentors and invite to inventory training
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-5">
          <CardHeader>
            <CardTitle>Resources</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Link
              href={"#"}
              className="flex items-center gap-4 rounded-md p-2 pt-3 transition-all hover:bg-accent hover:text-accent-foreground"
            >
              <Avatar className="flex h-9 w-9">
                <AvatarFallback>
                  <BookText className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Leader Handbook
                </p>
                <p className="text-sm text-muted-foreground">
                  Essential resource for leaders
                </p>
              </div>
            </Link>
            <Link
              href={"#"}
              className="flex items-center gap-4 rounded-md p-2 pt-3 transition-all hover:bg-accent hover:text-accent-foreground"
            >
              <Avatar className="flex h-9 w-9">
                <AvatarFallback>
                  <BookText className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Leader Handbook
                </p>
                <p className="text-sm text-muted-foreground">
                  Essential resource for leaders
                </p>
              </div>
            </Link>
            <Link
              href={"#"}
              className="flex items-center gap-4 rounded-md p-2 pt-3 transition-all hover:bg-accent hover:text-accent-foreground"
            >
              <Avatar className="flex h-9 w-9">
                <AvatarFallback>
                  <BookText className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Leader Handbook
                </p>
                <p className="text-sm text-muted-foreground">
                  Essential resource for leaders
                </p>
              </div>
            </Link>
            <Link
              href={"#"}
              className="flex items-center gap-4 rounded-md p-2 pt-3 transition-all hover:bg-accent hover:text-accent-foreground"
            >
              <Avatar className="flex h-9 w-9">
                <AvatarFallback>
                  <BookText className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Leader Handbook
                </p>
                <p className="text-sm text-muted-foreground">
                  Essential resource for leaders
                </p>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default DashboardPage;
