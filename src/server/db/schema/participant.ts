import { relations } from "drizzle-orm";
import { boolean, date, uuid, varchar } from "drizzle-orm/pg-core";

import { createTable, genderEnum } from "@/server/db/schema";
import { mentors } from "@/server/db/schema/mentor";

export const participants = createTable("participant", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: varchar("firstName", { length: 255 }).notNull(),
  lastName: varchar("lastName", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 15 }),
  dob: date("dob", { mode: "string" }),
  gender: genderEnum("gender"),
  married: boolean("married"),
  mentorId: uuid("mentorId").references(() => mentors.id),
});

export const participantRelations = relations(participants, ({ one }) => ({
  mentor: one(mentors, {
    fields: [participants.mentorId],
    references: [mentors.id],
  }),
}));
