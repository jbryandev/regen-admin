"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
import { userSchema } from "@/lib/schema";
import { api } from "@/trpc/react";

type ProfileFormValues = z.infer<typeof userSchema>;

const ProfileForm = () => {
  const user = api.user.getUserProfile.useQuery().data;

  // const updateUser = api.user.update.useMutation({
  // onSuccess: () => {
  //   toast("Profile updated!", {
  //     description: JSON.stringify(data, null, 2),
  //   });
  // },
  // });

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  };

  const values = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues,
    values,
    mode: "onChange",
  });

  function onSubmit(data: ProfileFormValues) {
    // updateUser.mutate(data);
    toast("Profile updated!", {
      description: JSON.stringify(data, null, 2),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 xs:space-y-8"
      >
        <div className="grid w-full gap-4 xs:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid w-full gap-4 xs:grid-cols-2">
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
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
};

export default ProfileForm;
