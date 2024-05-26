import { pgEnum, pgTableCreator } from "drizzle-orm/pg-core";

// Multiproject schema definition
export const createTable = pgTableCreator((name) => `regen_${name}`);

// Enums
export const genderEnum = pgEnum("gender", ["male", "female"]);
export const roleEnum = pgEnum("role", [
  "admin",
  "director",
  "director-mens",
  "director-womens",
  "coach",
  "leader",
  "tech",
]);
