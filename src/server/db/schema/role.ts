import { boolean, text, uuid, varchar } from "drizzle-orm/pg-core";
import { createSelectSchema } from "drizzle-zod";

import { createTable } from "@/server/db/schema";

// Table definitions
export const roles = createTable("role", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  isAdmin: boolean("isAdmin").default(false).notNull(),
});

// Schemas
export const roleSchema = createSelectSchema(roles);
