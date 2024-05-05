"use server";

import { cookies } from "next/headers";

import { db } from "@/server/db";
import { sessions } from "@/server/db/schema/auth";

export const switchUser = async (userId: string) => {
  try {
    const sessionToken = crypto.randomUUID();
    const expiration = new Date();

    // Create new session
    await db.insert(sessions).values({
      sessionToken,
      userId,
      expires: new Date(expiration.setDate(expiration.getDate() + 30)),
    });

    // Update session cookie
    cookies().set("next-auth.session-token", sessionToken, {
      path: "/",
      httpOnly: true,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error");
    }
  }
};
