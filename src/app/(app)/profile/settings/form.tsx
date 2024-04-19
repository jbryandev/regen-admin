"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";

const settingsFormSchema = z.object({
  communicationReminders: z.boolean().default(true).optional(),
  participantFollowup: z.boolean().default(true).optional(),
  testimonyReminders: z.boolean().default(true).optional(),
  importantUpdates: z.boolean(),
  pushNotifications: z.boolean(),
  emailNotifications: z.boolean(),
});

type SettingsFormValues = z.infer<typeof settingsFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<SettingsFormValues> = {
  communicationReminders: false,
  testimonyReminders: false,
  participantFollowup: true,
  importantUpdates: true,
  pushNotifications: true,
  emailNotifications: true,
};

const SettingsForm = () => {
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues,
  });

  function onSubmit(data: SettingsFormValues) {
    toast("You submitted the following values:", {
      description: JSON.stringify(data, null, 2),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h3 className="text-base font-medium md:text-lg">Notifications</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Configure the kinds of notifications you want to receive
          </p>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="communicationReminders"
              render={({ field }) => (
                <FormItem className="flex max-w-xl flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm md:text-base">
                      Communication reminders
                    </FormLabel>
                    <FormDescription>
                      Be reminded when to send mentor and participant
                      communication
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="testimonyReminders"
              render={({ field }) => (
                <FormItem className="flex max-w-xl flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm md:text-base">
                      Participant follow up
                    </FormLabel>
                    <FormDescription>
                      Be notified when participant follow up is recommended
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="participantFollowup"
              render={({ field }) => (
                <FormItem className="flex max-w-xl flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm md:text-base">
                      Testimony reminders
                    </FormLabel>
                    <FormDescription>
                      Receive reminders when your testimony is due
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="importantUpdates"
              render={({ field }) => (
                <FormItem className="flex max-w-xl flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm md:text-base">
                      Important updates
                    </FormLabel>
                    <FormDescription>
                      Receive important announcements from ministry leadership
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <div>
          <h3 className="text-base font-medium md:text-lg">
            Notification Method
          </h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Control where notifications get delivered
          </p>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="pushNotifications"
              render={({ field }) => (
                <FormItem className="flex max-w-xl flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm md:text-base">
                      Push notifications
                    </FormLabel>
                    <FormDescription>
                      Receive notifications within the app
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pushNotifications"
              render={({ field }) => (
                <FormItem className="flex max-w-xl flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-sm md:text-base">
                      Email notifications
                    </FormLabel>
                    <FormDescription>
                      Receive notifications via email
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit">Update settings</Button>
      </form>
    </Form>
  );
};

export default SettingsForm;
