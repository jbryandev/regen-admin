"use client";

import parsePhoneNumberFromString, { AsYouType } from "libphonenumber-js";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { type z } from "zod";

import { updateUserProfile } from "@/app/(app)/profile/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submit-button";
import { type userProfileSchema } from "@/server/db/schema";

type ProfileFormProps = z.infer<typeof userProfileSchema>;

const initialFormState = {
  success: false,
  message: "",
};

const ProfileForm = ({ user }: { user: ProfileFormProps }) => {
  const [formState, formAction] = useFormState(
    updateUserProfile,
    initialFormState,
  );

  useEffect(() => {
    if (formState.success && formState.message) {
      toast.success(formState.message);
    } else if (!formState.success && formState.message) {
      toast.error("Unable to update profile", {
        description: formState.message,
      });
    }
  }, [formState]);

  const formattedPhone = parsePhoneNumberFromString(
    user.phone,
    "US",
  )?.formatNational();

  const handlePhoneInput = (event: React.FormEvent<HTMLInputElement>) => {
    const asYouType = new AsYouType("US");
    const value = event.currentTarget.value;
    const formattedValue = asYouType.input(value);
    event.currentTarget.value = formattedValue;
  };

  return (
    <form action={formAction}>
      <div className="space-y-8">
        <div className="flex max-w-md flex-col gap-8">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              defaultValue={user.name ?? ""}
              minLength={1}
              maxLength={50}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              defaultValue={user.email}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              type="text"
              id="phone"
              name="phone"
              defaultValue={formattedPhone}
              onInput={handlePhoneInput}
              maxLength={14}
            />
          </div>
        </div>
        <SubmitButton>Update Profile</SubmitButton>
      </div>
    </form>
  );
};

export default ProfileForm;
