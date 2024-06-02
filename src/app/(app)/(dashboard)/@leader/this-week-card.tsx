import { CalendarDays } from "lucide-react";

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
import { type MeetingWithScheduleItem } from "@/lib/types";

const ThisWeekCard = async ({
  currentWeek,
}: {
  currentWeek?: MeetingWithScheduleItem;
}) => {
  return (
    <Card className="order-1 flex flex-col justify-between">
      <CardHeader className="flex-none">
        <CardDescription className="flex flex-row items-center justify-between space-y-0">
          This Week
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
        </CardDescription>
        <CardTitle className="text-xl">
          {currentWeek?.scheduleItem.name ?? "Nothing of note"}
        </CardTitle>
      </CardHeader>
      <CardContent className="grow text-sm text-muted-foreground">
        {currentWeek?.scheduleItem.description ?? "Enjoy the week off!"}
      </CardContent>
      <CardFooter className="flex-none gap-2">
        {currentWeek?.scheduleItem.video && (
          <TrainingVideoPopup
            video={currentWeek?.scheduleItem.video}
            title={currentWeek.scheduleItem.name}
          >
            <Button className="w-full">Watch Training</Button>
          </TrainingVideoPopup>
        )}
      </CardFooter>
    </Card>
  );
};

export default ThisWeekCard;
