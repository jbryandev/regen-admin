import { uuid } from "drizzle-orm/pg-core";

import { createTable } from "@/server/db/schema";

export const groups = createTable("group", {
  id: uuid("id").defaultRandom().primaryKey(),
});
