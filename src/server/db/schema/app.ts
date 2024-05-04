import { relations } from "drizzle-orm";
import { boolean, date, text, uuid, varchar } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";

import { createTable, genderEnum } from "@/server/db/schema";
import { users } from "@/server/db/schema/auth";

// Table definitions
export const participants = createTable("participant", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 15 }),
  image: varchar("image", { length: 255 }),
  dob: date("dob", { mode: "date" }),
  gender: genderEnum("gender"),
  married: boolean("married"),
  mentorId: uuid("mentor_id").references(() => mentors.id),
  groupId: uuid("group_id").references(() => groups.id),
});

export const mentors = createTable("mentor", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 15 }),
});

export const groups = createTable("group", {
  id: uuid("id").defaultRandom().primaryKey(),
});

export const meetings = createTable("meeting", {
  id: uuid("id").defaultRandom().primaryKey(),
  groupId: uuid("group_id").references(() => groups.id, {
    onDelete: "cascade",
  }),
});

export const attendance = createTable("attendance", {
  id: uuid("id").defaultRandom().primaryKey(),
  meetingId: uuid("meeting_id").references(() => meetings.id, {
    onDelete: "cascade",
  }),
  participantId: uuid("participant_id").references(() => participants.id),
});

export const scheduleTemplates = createTable("schedule_template", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  scheduleItemId: uuid("schedule_item_id").references(() => scheduleItems.id),
});

export const scheduleItems = createTable("schedule_item", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
});

export const struggles = createTable("struggle", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
});

export const participantsToStruggles = createTable(
  "participants_to_struggles",
  {
    participantId: uuid("participant_id")
      .notNull()
      .references(() => participants.id),
    struggleId: uuid("struggle_id")
      .notNull()
      .references(() => struggles.id),
  },
);

// Relations
export const participantRelations = relations(
  participants,
  ({ one, many }) => ({
    mentor: one(mentors, {
      fields: [participants.mentorId],
      references: [mentors.id],
    }),
    group: one(groups, {
      fields: [participants.groupId],
      references: [groups.id],
    }),
    participantsToStruggles: many(participantsToStruggles),
  }),
);

export const mentorsRelations = relations(mentors, ({ many }) => ({
  participants: many(participants),
}));

export const groupRelations = relations(groups, ({ many }) => ({
  users: many(users),
  meetings: many(meetings),
  participants: many(participants),
}));

export const meetingRelations = relations(meetings, ({ one }) => ({
  group: one(groups, {
    fields: [meetings.groupId],
    references: [groups.id],
  }),
}));

export const attendanceRelations = relations(attendance, ({ one, many }) => ({
  meeting: one(meetings, {
    fields: [attendance.meetingId],
    references: [meetings.id],
  }),
  participants: many(participants),
}));

export const scheduleTemplateRelations = relations(
  scheduleTemplates,
  ({ many }) => ({
    scheduleItems: many(scheduleItems),
  }),
);

export const struggleRelations = relations(struggles, ({ many }) => ({
  participantsToStruggles: many(participantsToStruggles),
}));

// Schema
export const participantSchema = createSelectSchema(participants);
export const mentorSchema = createSelectSchema(mentors);
export const groupSchema = createSelectSchema(groups);
export const meetingSchema = createSelectSchema(meetings);
export const attendanceSchema = createSelectSchema(attendance);
export const scheduleTemplateSchema = createSelectSchema(scheduleTemplates);
export const scheduleItemsSchema = createSelectSchema(scheduleItems);
export const struggleSchema = createSelectSchema(struggles);
export const participantToStruggleSchema = createSelectSchema(
  participantsToStruggles,
);
