import dayjs from "dayjs";
import { CalendarDays } from "lucide-react";
import { type z } from "zod";

import TrainingVideoPopup from "@/components/training-video-popup";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/server/db";
import { type groupSchema } from "@/server/db/schema/app";

type Group = z.infer<typeof groupSchema>;

const ThisWeekCard = async ({ group }: { group: Group }) => {
  const groupMeetings = await db.query.meetings.findMany({
    where: (meeting, { eq }) => eq(meeting.groupId, group.id),
    orderBy: (meeting, { asc }) => [asc(meeting.date)],
    with: {
      scheduleItem: true,
    },
  });

  const currentWeek = groupMeetings.find((meeting) =>
    dayjs().isBefore(dayjs(meeting.date)),
  );

  return (
    <Card className="order-1 flex flex-col justify-between">
      <CardHeader className="flex-none">
        <CardDescription className="flex flex-row items-center justify-between space-y-0">
          This Week
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
        </CardDescription>
        <CardTitle className="text-xl">
          {currentWeek?.scheduleItem.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="grow text-sm text-muted-foreground">
        {currentWeek?.scheduleItem.description}
      </CardContent>
      <CardFooter className="flex-none gap-2">
        {currentWeek?.scheduleItem && (
          <TrainingVideoPopup scheduleItem={currentWeek?.scheduleItem}>
            <Button variant={"secondary"} className="w-full">
              Watch Training
            </Button>
          </TrainingVideoPopup>
        )}
      </CardFooter>
    </Card>
  );
};

export default ThisWeekCard;
