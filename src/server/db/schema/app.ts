import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  integer,
  text,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
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
  name: varchar("name", { length: 255 }),
});

export const usersToGroups = createTable("users_to_groups", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  groupId: uuid("group_id").references(() => groups.id, {
    onDelete: "cascade",
  }),
});

export const meetings = createTable("meeting", {
  id: uuid("id").defaultRandom().primaryKey(),
  groupId: uuid("group_id")
    .references(() => groups.id, {
      onDelete: "cascade",
    })
    .notNull(),
  scheduleItemId: uuid("schedule_item_id")
    .references(() => scheduleItems.id)
    .notNull(),
  date: date("date", { mode: "date" }).notNull(),
  description: text("description"),
});

export const attendance = createTable("attendance", {
  id: uuid("id").defaultRandom().primaryKey(),
  meetingId: uuid("meeting_id")
    .references(() => meetings.id, {
      onDelete: "cascade",
    })
    .notNull(),
  participantId: uuid("participant_id")
    .references(() => participants.id)
    .notNull(),
});

export const scheduleTemplates = createTable("schedule_template", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  duration: integer("duration"),
});

export const scheduleItems = createTable("schedule_item", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
});

export const templatesToItems = createTable("templates_to_items", {
  id: uuid("id").defaultRandom().primaryKey(),
  templateId: uuid("template_id").references(() => scheduleTemplates.id),
  weekNumber: integer("week_number").notNull(),
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
    attendance: many(attendance),
  }),
);

export const mentorsRelations = relations(mentors, ({ many }) => ({
  participants: many(participants),
}));

export const groupRelations = relations(groups, ({ many }) => ({
  users: many(usersToGroups),
  meetings: many(meetings),
  participants: many(participants),
}));

export const userToGroupRelations = relations(usersToGroups, ({ one }) => ({
  user: one(users, {
    fields: [usersToGroups.userId],
    references: [users.id],
  }),
  group: one(groups, {
    fields: [usersToGroups.groupId],
    references: [groups.id],
  }),
}));

export const meetingRelations = relations(meetings, ({ one }) => ({
  group: one(groups, {
    fields: [meetings.groupId],
    references: [groups.id],
  }),
}));

export const attendanceRelations = relations(attendance, ({ one }) => ({
  meeting: one(meetings, {
    fields: [attendance.meetingId],
    references: [meetings.id],
  }),
  participant: one(participants, {
    fields: [attendance.participantId],
    references: [participants.id],
  }),
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
export const userToGroupSchema = createSelectSchema(usersToGroups);
