"use server";

import { revalidatePath } from "next/cache";
import { fromZodError } from "zod-validation-error";

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
    const message = fromZodError(parse.error).toString();
    return { success: false, message: message };
  }

  try {
    await updateProfile(parse.data);
    revalidatePath("/profile");
    return { success: true, message: "Successfully updated profile" };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { success: false, message: error.message };
    } else {
      return { success: false, message: "Unknown error" };
    }
  }
};

export { updateUserProfile };
