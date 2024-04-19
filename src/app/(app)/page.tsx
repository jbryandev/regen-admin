import {
  ArrowUpRight,
  BookOpen,
  BookText,
  CalendarDays,
  Circle,
  CircleCheck,
  CircleChevronRight,
  Dot,
  HeartHandshake,
  ListChecks,
  Mail,
  Send,
  Speech,
  UserCheck,
  Users,
  Video,
} from "lucide-react";
import Link from "next/link";

import { ColoredDot } from "@/components/colored-dot";
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
      <div className="grid gap-4 sm:grid-cols-2 md:gap-8 xl:grid-cols-4">
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
            {/* <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Foundation
                  </TableCell>
                  <TableCell>Psalm 51:6</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Key theme
                  </TableCell>
                  <TableCell>Realize God&apos;s grace</TableCell>
                </TableRow>
              </TableBody>
            </Table> */}
          </CardContent>
          <CardFooter className="flex-none gap-2">
            <Button variant={"secondary"} className="w-full">
              Watch Training
            </Button>
          </CardFooter>
        </Card>
        {/* <Card className="flex flex-col justify-between xl:col-span-2">
          <CardHeader className="flex-none">
            <CardDescription className="flex flex-row items-center justify-between space-y-0">
              Communications
              <Send className="h-4 w-4 text-muted-foreground" />
            </CardDescription>
          </CardHeader>
          <CardContent className="grow">
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    This week
                  </TableCell>
                  <TableCell>Mentor communications due</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-muted-foreground">
                    Next week
                  </TableCell>
                  <TableCell>Participant communications due</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex-none">
            <Button variant={"secondary"} className="w-full">
              See all communications
            </Button>
          </CardFooter>
        </Card> */}
        <Card className="order-3 col-span-2 flex flex-col justify-between xl:order-2">
          <CardHeader className="flex-none">
            <CardDescription className="flex flex-row items-center justify-between space-y-0">
              Tasks for the week
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
          {/* <CardFooter className="text-sm text-muted-foreground">ESV</CardFooter> */}
        </Card>
      </div>
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
    </main>
  );
};

export default DashboardPage;

// import {
//   ArrowUpRight,
//   BookText,
//   CalendarDays,
//   CircleChevronRight,
//   UserCheck,
//   Users,
//   Video,
// } from "lucide-react";
// import Link from "next/link";

// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button, buttonVariants } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Progress } from "@/components/ui/progress";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { cn } from "@/lib/utils";

// const DashboardPage = () => {
//   return (
//     <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
// <div className="flex items-center justify-between">
//   <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
//   <div
//     className={cn(
//       buttonVariants({ variant: "secondary" }),
//       "cursor-default select-none",
//     )}
//   >
//     Regen Leader
//   </div>
// </div>
//       <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
//         <Link href="/groups">
//           <Card className="h-full">
//             <CardHeader>
//               <CardDescription className="flex flex-row items-center justify-between space-y-0">
//                 Participants
//                 <Users className="h-4 w-4 text-muted-foreground" />
//               </CardDescription>
//               <CardTitle className="text-xl sm:text-2xl">12</CardTitle>
//             </CardHeader>
//           </Card>
//         </Link>
//         <Link href="/schedule">
//           <Card>
//             <CardHeader>
//               <CardDescription className="flex flex-row items-center justify-between space-y-0">
//                 Progress
//                 <CalendarDays className="h-4 w-4 text-muted-foreground" />
//               </CardDescription>
//               <CardTitle className="text-xl sm:text-2xl">
//                 Step 4, Week 1
//               </CardTitle>
//             </CardHeader>
//             <CardFooter>
//               <Progress value={25} aria-label="25% complete" />
//             </CardFooter>
//           </Card>
//         </Link>
//         <Link href="/attendance">
//           <Card>
//             <CardHeader>
//               <CardDescription className="flex flex-row items-center justify-between space-y-0">
//                 Attendance
//                 <UserCheck className="h-4 w-4 text-muted-foreground" />
//               </CardDescription>
//               <CardTitle className="text-xl sm:text-2xl">
//                 10 <span className="text-xs text-muted-foreground">of 12</span>
//               </CardTitle>
//             </CardHeader>
//             <CardFooter>
//               <Progress value={85} aria-label="85% attendance" />
//             </CardFooter>
//           </Card>
//         </Link>
// <Link href="/training">
//   <Card className="h-full">
//     <CardHeader>
//       <CardDescription className="flex flex-row items-center justify-between space-y-0">
//         Watch
//         <Video className="h-4 w-4 text-muted-foreground" />
//       </CardDescription>
//       <CardTitle className="text-xl sm:text-2xl">
//         Leader Training
//       </CardTitle>
//     </CardHeader>
//   </Card>
// </Link>
//       </div>
//       <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
//         <Card className="xl:col-span-2">
//           <CardHeader className="flex flex-row items-center justify-between">
//             <CardTitle>Week at a glance</CardTitle>
//             <Button variant={"outline"} className="flex items-center gap-2">
//               <CalendarDays className="h-4 w-4" />
//               Step 4, Week 1
//             </Button>
//           </CardHeader>
//           <CardContent className="grid gap-8">
//             <div>
//               <h4 className="mb-2 text-sm font-medium leading-none">Tasks</h4>
// <Table>
//   <TableBody>
//     <TableRow>
//       <TableCell>
//         <Checkbox className="mr-2" />
//       </TableCell>
//       <TableCell className="text-muted-foreground">
//         Email mentors and invite to inventory training
//       </TableCell>
//     </TableRow>
//     <TableRow>
//       <TableCell>
//         <Checkbox />
//       </TableCell>
//       <TableCell className="text-muted-foreground">
//         Pray for the Holy Spirit to work in the hearts of the
//         participants
//       </TableCell>
//     </TableRow>
//     <TableRow>
//       <TableCell>
//         <Checkbox />
//       </TableCell>
//       <TableCell className="text-muted-foreground">
//         Email mentors and invite to inventory training
//       </TableCell>
//     </TableRow>
//   </TableBody>
// </Table>
//             </div>
//           </CardContent>
//         </Card>
//         <Card x-chunk="dashboard-01-chunk-5">
//           <CardHeader>
//             <CardTitle>Resources</CardTitle>
//           </CardHeader>
//           <CardContent className="grid gap-4">
//             <Link
//               href={"#"}
//               className="flex items-center gap-4 rounded-md p-2 pt-3 transition-all hover:bg-accent hover:text-accent-foreground"
//             >
//               <Avatar className="flex h-9 w-9">
//                 <AvatarFallback>
//                   <BookText className="h-4 w-4" />
//                 </AvatarFallback>
//               </Avatar>
//               <div className="grid gap-1">
//                 <p className="text-sm font-medium leading-none">
//                   Leader Handbook
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   Essential resource for leaders
//                 </p>
//               </div>
//             </Link>
//             <Link
//               href={"#"}
//               className="flex items-center gap-4 rounded-md p-2 pt-3 transition-all hover:bg-accent hover:text-accent-foreground"
//             >
//               <Avatar className="flex h-9 w-9">
//                 <AvatarFallback>
//                   <BookText className="h-4 w-4" />
//                 </AvatarFallback>
//               </Avatar>
//               <div className="grid gap-1">
//                 <p className="text-sm font-medium leading-none">
//                   Leader Handbook
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   Essential resource for leaders
//                 </p>
//               </div>
//             </Link>
//             <Link
//               href={"#"}
//               className="flex items-center gap-4 rounded-md p-2 pt-3 transition-all hover:bg-accent hover:text-accent-foreground"
//             >
//               <Avatar className="flex h-9 w-9">
//                 <AvatarFallback>
//                   <BookText className="h-4 w-4" />
//                 </AvatarFallback>
//               </Avatar>
//               <div className="grid gap-1">
//                 <p className="text-sm font-medium leading-none">
//                   Leader Handbook
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   Essential resource for leaders
//                 </p>
//               </div>
//             </Link>
//             <Link
//               href={"#"}
//               className="flex items-center gap-4 rounded-md p-2 pt-3 transition-all hover:bg-accent hover:text-accent-foreground"
//             >
//               <Avatar className="flex h-9 w-9">
//                 <AvatarFallback>
//                   <BookText className="h-4 w-4" />
//                 </AvatarFallback>
//               </Avatar>
//               <div className="grid gap-1">
//                 <p className="text-sm font-medium leading-none">
//                   Leader Handbook
//                 </p>
//                 <p className="text-sm text-muted-foreground">
//                   Essential resource for leaders
//                 </p>
//               </div>
//             </Link>
//           </CardContent>
//         </Card>
//       </div>
//     </main>
//   );
// };

// export default DashboardPage;
