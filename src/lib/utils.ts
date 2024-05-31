import { type ClassValue, clsx } from "clsx";
import parsePhoneNumberFromString from "libphonenumber-js";
import { customAlphabet } from "nanoid";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhone(phone: string) {
  const formattedPhone = `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 10)}`;
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

export function nanoid() {
  const alphabet = "0123456789abcdefghijklmnopqrstuvwxyz";
  const nanoid = customAlphabet(alphabet, 10);
  return nanoid();
}
