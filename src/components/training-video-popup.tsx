import React from "react";
import { type z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type scheduleItemsSchema } from "@/server/db/schema/app";

type ScheduleItem = z.infer<typeof scheduleItemsSchema>;

const TrainingVideoPopup = ({
  children,
  scheduleItem,
}: {
  children: React.ReactNode;
  scheduleItem: ScheduleItem;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Leader Training Video</DialogTitle>
          <DialogDescription>{scheduleItem.name}</DialogDescription>
        </DialogHeader>
        {scheduleItem.video && (
          <iframe src={scheduleItem.video} allowFullScreen />
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TrainingVideoPopup;
