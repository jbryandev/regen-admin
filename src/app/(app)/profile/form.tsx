"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import parsePhoneNumberFromString, { AsYouType } from "libphonenumber-js";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

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
import { userProfileSchema } from "@/server/db/schema";

type FormData = z.infer<typeof userProfileSchema>;

const ProfileForm = ({ user }: { user: FormData }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  if (user.name === null) {
    // Controlled form requires non-null values
    user.name = "";
  }

  const formattedPhone = String(
    parsePhoneNumberFromString(user.phone, "US")?.formatNational(),
  );

  const form = useForm<FormData>({
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

  const onSubmit = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    return true;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update profile
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
