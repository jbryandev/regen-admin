import { pgEnum, pgTableCreator } from "drizzle-orm/pg-core";

// Multiproject schema definition
export const createTable = pgTableCreator((name) => `regen_${name}`);

// Enums
export const genderEnum = pgEnum("gender", ["male", "female"]);

// Old PRISMA schemas
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
