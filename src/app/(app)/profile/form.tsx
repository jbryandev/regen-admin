"use client";

import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { toast } from "sonner";
import { type z } from "zod";

import { updateUserProfile } from "@/app/(app)/profile/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type userProfileSchema } from "@/server/db/schema";

const SubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="flex gap-2">
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      Update profile
    </Button>
  );
};

type ProfileFormProps = z.infer<typeof userProfileSchema>;

const ProfileForm = ({ user }: { user: ProfileFormProps }) => {
  const [formState, formAction] = useFormState(updateUserProfile, {
    success: false,
    message: "",
  });

  useEffect(() => {
    if (formState.success && formState.message) {
      toast.success(formState.message);
    } else if (!formState.success && formState.message) {
      toast.error(formState.message);
    }
  }, [formState]);

  return (
    <form action={formAction}>
      <div className="space-y-8">
        <div className="flex max-w-md flex-col gap-8">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input type="text" id="name" name="name" defaultValue={user.name} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="text"
              id="email"
              name="email"
              defaultValue={user.email}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              type="text"
              id="phone"
              name="phone"
              defaultValue={user.phone}
            />
          </div>
        </div>
        <SubmitButton />
      </div>
    </form>
  );
};

export default ProfileForm;
