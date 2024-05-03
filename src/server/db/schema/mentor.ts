import { relations } from "drizzle-orm";
import { uuid, varchar } from "drizzle-orm/pg-core";

import { createTable } from "@/server/db/schema";
import { participants } from "@/server/db/schema/participant";

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
