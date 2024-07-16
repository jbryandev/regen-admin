import { type LucideIcon } from "lucide-react";
import { type z } from "zod";

import {
  type scheduleItemSchema,
  type meetingSchema,
  type taskSchema,
  type groupSchema,
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

export type User = z.infer<typeof userSchema>;

export type Meeting = z.infer<typeof meetingSchema>;

export type ScheduleItem = z.infer<typeof scheduleItemSchema>;

export type Task = z.infer<typeof taskSchema>;

export type Group = z.infer<typeof groupSchema>;

export type MeetingWithScheduleItem = Meeting & {
  scheduleItem: ScheduleItem;
};

export type MeetingWithScheduleItemAndTasks = Meeting & {
  scheduleItem: ScheduleItem & {
    tasks: Array<Task>;
  };
};

export type GroupLeadershipCardProps = Pick<
  z.infer<typeof userSchema>,
  "id" | "name" | "image" | "email" | "role"
> & { phone: string | null };

export type GroupWithDetails = Pick<Group, "id" | "name" | "gender"> & {
  participants: Array<Pick<Participant, "id">>;
  meetings: Array<
    Pick<Meeting, "date"> & {
      scheduleItem: Pick<ScheduleItem, "id" | "name">;
    }
  >;
};

export type NavigationMenu =
  | { variant: Exclude<User["role"], "leader"> }
  | { variant: "leader"; groupId: string };

export type NavigationMenuItem = {
  title: string;
  icon: LucideIcon;
  path: string;
};
