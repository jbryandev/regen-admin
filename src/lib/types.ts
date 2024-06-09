import { type z } from "zod";

import {
  type scheduleItemSchema,
  type meetingSchema,
  type taskSchema,
} from "@/server/db/schema/app";
import { type userSchema } from "@/server/db/schema/auth";

export type Participant = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: "male" | "female";
  age: number;
};

export type Meeting = z.infer<typeof meetingSchema>;

export type ScheduleItem = z.infer<typeof scheduleItemSchema>;

export type Task = z.infer<typeof taskSchema>;

export type MeetingWithScheduleItem = Meeting & {
  scheduleItem: ScheduleItem;
};

export type MeetingWithScheduleItemAndTasks = Meeting & {
  scheduleItem: ScheduleItem & {
    tasks: Task[];
  };
};

export type GroupLeadershipCardProps = Pick<
  z.infer<typeof userSchema>,
  "id" | "name" | "image" | "email" | "phone" | "role"
> | null;
