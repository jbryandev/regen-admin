import { BookOpen, CalendarDays, Circle, ListChecks } from "lucide-react";

import { ColoredDot } from "@/components/colored-dot";
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

const LeaderDashboard = () => {
  return (
    <>
      <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 md:gap-8 xl:grid-cols-4">
        <Card className="order-1 flex flex-col justify-between">
          <CardHeader className="flex-none">
            <CardDescription className="flex flex-row items-center justify-between space-y-0">
              This Week
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
            </CardDescription>
            <CardTitle className="text-xl">Step 4, Week 1</CardTitle>
          </CardHeader>
          <CardContent className="grow text-sm text-muted-foreground">
            <p>
              We make a searching and fearless moral inventory of ourselves.
            </p>
          </CardContent>
          <CardFooter className="flex-none gap-2">
            <Button variant={"secondary"} className="w-full">
              Watch Training
            </Button>
          </CardFooter>
        </Card>
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
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Attendance</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>email</TableCell>
                <TableCell>phone</TableCell>
                <TableCell className="flex h-[37px] items-center">
                  <ColoredDot className="mr-1" />
                  <ColoredDot className="mr-1" />
                  <ColoredDot />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>email</TableCell>
                <TableCell>phone</TableCell>
                <TableCell className="flex h-[37px] items-center">
                  <ColoredDot className="mr-1" />
                  <ColoredDot className="mr-1" />
                  <ColoredDot variant={"red"} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>email</TableCell>
                <TableCell>phone</TableCell>
                <TableCell className="flex h-[37px] items-center">
                  <ColoredDot className="mr-1" />
                  <ColoredDot className="mr-1" />
                  <ColoredDot />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>email</TableCell>
                <TableCell>phone</TableCell>
                <TableCell className="flex h-[37px] items-center">
                  <ColoredDot className="mr-1" />
                  <ColoredDot className="mr-1" />
                  <ColoredDot variant={"red"} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>email</TableCell>
                <TableCell>phone</TableCell>
                <TableCell className="flex h-[37px] items-center">
                  <ColoredDot className="mr-1" />
                  <ColoredDot className="mr-1" />
                  <ColoredDot />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>email</TableCell>
                <TableCell>phone</TableCell>
                <TableCell className="flex h-[37px] items-center">
                  <ColoredDot className="mr-1" />
                  <ColoredDot className="mr-1" />
                  <ColoredDot variant={"red"} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>email</TableCell>
                <TableCell>phone</TableCell>
                <TableCell className="flex h-[37px] items-center">
                  <ColoredDot className="mr-1" />
                  <ColoredDot className="mr-1" />
                  <ColoredDot />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>John Doe</TableCell>
                <TableCell>email</TableCell>
                <TableCell>phone</TableCell>
                <TableCell className="flex h-[37px] items-center">
                  <ColoredDot className="mr-1" />
                  <ColoredDot className="mr-1" />
                  <ColoredDot variant={"red"} />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default LeaderDashboard;
