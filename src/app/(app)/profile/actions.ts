"use server";

import { revalidatePath } from "next/cache";

import { userProfileSchema } from "@/server/db/schema";
import { updateUserProfile as updateProfile } from "@/server/queries";

const updateUserProfile = async (
  prevState: {
    success: boolean;
    message: string;
  },
  formData: FormData,
) => {
  const parse = userProfileSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  });

  if (!parse.success) {
    return { success: false, message: "Failed to update profile" };
  }

  const data = parse.data;

  try {
    await updateProfile(data);
    revalidatePath("/profile");
    return { success: true, message: "Successfully updated profile" };
  } catch (e) {
    return { success: false, message: "Failed to update profile" };
  }
};

export { updateUserProfile };
