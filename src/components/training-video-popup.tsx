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

const TrainingVideoPopup = ({
  children,
  video,
  title,
}: {
  children: React.ReactNode;
  video: string;
  title?: string;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Leader Training Video</DialogTitle>
          <DialogDescription>{title}</DialogDescription>
        </DialogHeader>
        {video && <iframe src={video} allowFullScreen />}
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
