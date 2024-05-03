"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import parsePhoneNumberFromString, { AsYouType } from "libphonenumber-js";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

import { updateUserProfile } from "@/app/(app)/profile/actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/ui/submit-button";
import { userProfileSchema } from "@/server/db/schema/auth";

type UserProfile = z.infer<typeof userProfileSchema>;

const initialFormState = {
  success: false,
  message: "",
};

const ProfileForm = ({ user }: { user: UserProfile }) => {
  const [state, submitAction] = useFormState(
    updateUserProfile,
    initialFormState,
  );

  const formattedPhone = parsePhoneNumberFromString(
    user.phone ?? "",
    "US",
  )?.formatNational();

  const form = useForm<UserProfile>({
    resolver: zodResolver(userProfileSchema),
    values: { ...user, phone: formattedPhone },
    mode: "onChange",
  });

  const handlePhoneInput = (event: React.FormEvent<HTMLInputElement>) => {
    const asYouType = new AsYouType("US");
    const value = event.currentTarget.value;
    const formattedValue = asYouType.input(value);
    event.currentTarget.value = formattedValue;
  };

  useEffect(() => {
    const { success, message } = state;
    if (!success) {
      toast.error("Unable to update profile", {
        description: message,
      });
    } else {
      toast.success(message);
    }
  }, [state]);

  return (
    <Form {...form}>
      <form action={submitAction} className="space-y-8">
        <div className="flex max-w-md flex-col gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input onInput={handlePhoneInput} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center">
          <Button
            type="reset"
            variant={"secondary"}
            className="mr-4"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <SubmitButton>Update profile</SubmitButton>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
