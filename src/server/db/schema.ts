// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import {
  boolean,
  date,
  index,
  integer,
  pgEnum,
  pgTableCreator,
  primaryKey,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import type { AdapterAccount } from "next-auth/adapters";
import { z } from "zod";

import { zPhone } from "@/lib/utils";

// Multiproject schema definition
export const createTable = pgTableCreator((name) => `regen_${name}`);

// Enums
export const genderEnum = pgEnum("gender", ["male", "female"]);

// Authentication tables
export const users = createTable("user", {
  id: uuid("id").defaultRandom().notNull().primaryKey(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
  phone: varchar("phone", { length: 15 }),
  dob: date("dob", { mode: "date" }),
  gender: genderEnum("gender"),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
}));

export const accounts = createTable(
  "account",
  {
    userId: uuid("userId")
      .defaultRandom()
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("sessionToken", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: uuid("userId")
      .defaultRandom()
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);

// App-specific tables
export const roles = createTable("role", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  isAdmin: boolean("isAdmin").default(false),
});

// Validation schemas
export const userSchema = createSelectSchema(users).extend({
  name: z.optional(z.string()),
  email: z.string().email(),
  phone: zPhone,
});
export const userProfileSchema = userSchema.pick({
  name: true,
  email: true,
  phone: true,
});
export const userMenuSchema = userSchema.pick({
  name: true,
  image: true,
});

// Old PRISMA schema

// // Necessary for Next auth
// model Account {
//   id                String  @id @default(cuid())
//   userId            String
//   type              String
//   provider          String
//   providerAccountId String
//   refresh_token     String? // @db.Text
//   access_token      String? // @db.Text
//   expires_at        Int?
//   token_type        String?
//   scope             String?
//   id_token          String? // @db.Text
//   session_state     String?
//   user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

//   @@unique([provider, providerAccountId])
// }

// model Session {
//   id           String   @id @default(cuid())
//   sessionToken String   @unique
//   userId       String
//   expires      DateTime
//   user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
// }

// model User {
//   id            String       @id @default(cuid())
//   firstName     String       @default("John")
//   lastName      String       @default("Doe")
//   email         String       @unique
//   emailVerified DateTime?
//   phone         String       @default("5555555555")
//   image         String?
//   dob           DateTime     @default(now())
//   gender        String       @default("male")
//   accounts      Account[]
//   sessions      Session[]
//   Role          Role         @relation(fields: [roleId], references: [id])
//   roleId        String
//   Group         Group?       @relation(fields: [groupId], references: [id])
//   groupId       String?
//   CoachGroup    CoachGroup[]
// }

// model VerificationToken {
//   identifier String
//   token      String   @unique
//   expires    DateTime

//   @@unique([identifier, token])
// }

// model Participant {
//   id           String      @id @default(cuid())
//   firstName    String
//   lastName     String
//   email        String      @unique
//   phone        String
//   dob          DateTime
//   gender       String
//   married      Boolean?
//   struggles    Struggle[]
//   Mentor       Mentor      @relation(fields: [mentorId], references: [id])
//   mentorId     String
//   Group        Group?      @relation(fields: [groupId], references: [id])
//   groupId      String?
//   Attendance   Attendance? @relation(fields: [attendanceId], references: [id])
//   attendanceId String?
// }

// model Mentor {
//   id          String        @id @default(cuid())
//   firstName   String
//   lastName    String
//   email       String        @unique
//   phone       String
//   Participant Participant[]
// }

// model Group {
//   id           String        @id @default(cuid())
//   participants Participant[]
//   leaders      User[]
//   userId       String
//   Meeting      Meeting[]
//   CoachGroup   CoachGroup?   @relation(fields: [coachGroupId], references: [id])
//   coachGroupId String?
// }

// model CoachGroup {
//   id     String  @id @default(cuid())
//   user   User    @relation(fields: [userId], references: [id])
//   groups Group[]
//   userId String
// }

// model Role {
//   id          String  @id @default(cuid())
//   name        String
//   description String?
//   isAdmin     Boolean @default(false)
//   User        User[]
// }

// model Struggle {
//   id            String       @id @default(cuid())
//   name          String
//   Participant   Participant? @relation(fields: [participantId], references: [id])
//   participantId String?
// }

// model ScheduleTemplate {
//   id            String         @id @default(cuid())
//   name          String
//   description   String?
//   scheduleItems ScheduleItem[]
// }

// model ScheduleItem {
//   id                 String            @id @default(cuid())
//   name               String
//   description        String?
//   ScheduleTemplate   ScheduleTemplate? @relation(fields: [scheduleTemplateId], references: [id])
//   scheduleTemplateId String?
//   Meeting            Meeting[]
// }

// model Meeting {
//   id             String       @id @default(cuid())
//   group          Group        @relation(fields: [groupId], references: [id])
//   scheduleItem   ScheduleItem @relation(fields: [scheduleItemId], references: [id])
//   date           DateTime
//   groupId        String
//   scheduleItemId String
//   Attendance     Attendance[]
// }

// model Attendance {
//   id           String        @id @default(cuid())
//   meeting      Meeting       @relation(fields: [meetingId], references: [id])
//   participants Participant[]
//   meetingId    String
// }
