"use server";

import { cookies } from "next/headers";

import { db } from "@/server/db";
import { sessions } from "@/server/db/schema/auth";

export const switchUser = async (userId: string) => {
  try {
    const sessionToken = crypto.randomUUID();
    const expiration = new Date();
    const session = await db.insert(sessions).values({
      sessionToken,
      userId,
      expires: new Date(expiration.setDate(expiration.getDate() + 30)),
    });
    const cookie = cookies().set("next-auth.session-token", sessionToken, {
      path: "/",
      httpOnly: true,
    });
  } catch (error) {
    throw new Error(error);
  }
};
