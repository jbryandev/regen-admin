import { eq } from "drizzle-orm";
import { type z } from "zod";

import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { type userProfileSchema, users } from "@/server/db/schema";

import "server-only";

const getUserProfile = async () => {
  const session = await getServerAuthSession();
  if (!session) throw new Error("Unauthorized");

  const user = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.id, session.user.id),
  });
  if (!user) throw new Error("Unauthorized");

  return { name: user.name, email: user.email, phone: user.phone };
};

type UpdateUserProfileProps = z.infer<typeof userProfileSchema>;

const updateUserProfile = async (data: UpdateUserProfileProps) => {
  const session = await getServerAuthSession();
  if (!session) throw new Error("Unauthorized");

  await db
    .update(users)
    .set({
      name: data.name,
      email: data.email,
      phone: data.phone,
    })
    .where(eq(users.id, session.user.id));
};

export { getUserProfile, updateUserProfile };
