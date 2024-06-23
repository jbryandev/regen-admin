import { type ClassValue, clsx } from "clsx";
import parsePhoneNumberFromString from "libphonenumber-js";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

import { type MeetingWithScheduleItem } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhone(phone: string) {
  const formattedPhone = `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
  return formattedPhone;
}

export function prettyPhone(phone: string) {
  const formattedPhone = parsePhoneNumberFromString(phone, {
    // set this to use a default country when the phone number omits country code
    defaultCountry: "US",

    // set to false to require that the whole string is exactly a phone number,
    // otherwise, it will search for a phone number anywhere within the string
    extract: false,
  })?.formatNational();
  return formattedPhone;
}

export const zPhone = z.string().transform((arg, ctx) => {
  const phone = parsePhoneNumberFromString(arg, {
    // set this to use a default country when the phone number omits country code
    defaultCountry: "US",

    // set to false to require that the whole string is exactly a phone number,
    // otherwise, it will search for a phone number anywhere within the string
    extract: false,
  });

  // when it's good
  if (phone && phone.isValid()) {
    return phone.number;
  }

  // when it's not
  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    message: "Invalid phone number",
  });
  return z.NEVER;
});

export function fixedDate(date: string) {
  const givenDate = new Date(date);
  const offset = givenDate.getTimezoneOffset() * 60 * 1000;
  return new Date(givenDate.getTime() + offset);
}

export function shortDate(date: string) {
  // Split the input date string by hyphens
  const [year, month, day] = date.split("-");

  // Return the date in MM/DD/YYYY format
  return `${month}/${day}/${year}`;
}

export const longDate = (date: string) => {
  // Split the input date string by hyphens
  const [year, month, day] = date.split("-");

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthName = monthNames[parseInt(month ?? "1") - 1];

  // Return the date in MM/DD/YYYY format
  return `${monthName} ${day}, ${year}`;
};

export const getOneWeekAheadDate = (date: Date) => {
  const oneWeekAhead = new Date(date);
  oneWeekAhead.setDate(oneWeekAhead.getDate() + 7);
  return oneWeekAhead;
};

export const getOneDayBehindDate = (date: Date) => {
  const oneDayBehind = new Date(date);
  oneDayBehind.setDate(oneDayBehind.getDate() - 1);
  return oneDayBehind;
};

export const filterOutCancelledMeetings = (
  meetings: MeetingWithScheduleItem[],
) => {
  return meetings.filter((meeting) => !meeting.scheduleItem.isCancelled);
};

export const getRecentMeetings = (meetings: MeetingWithScheduleItem[]) => {
  return meetings
    .filter(
      (meeting) =>
        meeting.date <
        fixedDate(new Date().toISOString()).toISOString().split("T")[0]!,
    )
    .slice(-3)
    .map((meeting) => meeting.date);
};

export const getCurrentMeeting = (meetings: MeetingWithScheduleItem[]) => {
  return meetings.find(
    (meeting) =>
      meeting.date >=
      getOneDayBehindDate(new Date()).toISOString().split("T")[0]!,
  );
};
