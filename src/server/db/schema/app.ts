import { relations } from "drizzle-orm";
import { boolean, date, text, uuid, varchar } from "drizzle-orm/pg-core";

import { createTable, genderEnum } from "@/server/db/schema";
import { users } from "@/server/db/schema/auth";

// Table definitions
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
  groupId: uuid("groupId").references(() => groups.id),
});

export const mentors = createTable("mentor", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: varchar("firstName", { length: 255 }).notNull(),
  lastName: varchar("lastName", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 15 }),
});

export const groups = createTable("group", {
  id: uuid("id").defaultRandom().primaryKey(),
  leaderId: uuid("leaderId").references(() => users.id),
  coachId: uuid("coachId").references(() => users.id),
});

export const meetings = createTable("meeting", {
  id: uuid("id").defaultRandom().primaryKey(),
  groupId: uuid("groupId").references(() => groups.id, { onDelete: "cascade" }),
});

export const attendance = createTable("attendance", {
  id: uuid("id").defaultRandom().primaryKey(),
  meetingId: uuid("meetingId").references(() => meetings.id, {
    onDelete: "cascade",
  }),
  participantId: uuid("participantId").references(() => participants.id),
});

export const scheduleTemplates = createTable("schedule_template", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  scheduleItemId: uuid("scheduleItemId").references(() => scheduleItems.id),
});

export const scheduleItems = createTable("schedule_item", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
});

// Relations
export const participantRelations = relations(participants, ({ one }) => ({
  mentor: one(mentors, {
    fields: [participants.mentorId],
    references: [mentors.id],
  }),
  group: one(groups, {
    fields: [participants.groupId],
    references: [groups.id],
  }),
}));

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
