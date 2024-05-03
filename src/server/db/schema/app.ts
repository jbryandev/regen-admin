import { relations } from "drizzle-orm";
import { boolean, date, uuid, varchar } from "drizzle-orm/pg-core";

import { createTable, genderEnum } from "@/server/db/schema";

// Table definitions
export const mentors = createTable("mentor", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: varchar("firstName", { length: 255 }).notNull(),
  lastName: varchar("lastName", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 15 }),
});

export const mentorsRelations = relations(mentors, ({ many }) => ({
  participants: many(participants),
}));

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

export const groups = createTable("group", {
  id: uuid("id").defaultRandom().primaryKey(),
});

// Schemas
