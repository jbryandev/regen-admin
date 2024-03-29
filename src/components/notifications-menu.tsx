"use client";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Bell, Mail, User, FileText } from "lucide-react";
import Link from "next/link";

const notifications = [
  {
    id: 1,
    title: "Communication Due",
    subtitle: "Notify mentors of inventory training date",
    icon: Mail,
    read: false,
  },
  {
    id: 2,
    title: "Follow-up Needed",
    subtitle: "Saul has missed two meetings in a row",
    icon: User,
    read: true,
  },
  {
    id: 3,
    title: "Draft Testimony Due",
    subtitle: "Submit to reviewer by December 1",
    icon: FileText,
    read: true,
  },
];

const unreadNotifications = notifications.filter(
  (notification) => notification.read === false,
);

function markAllRead() {
  console.log("clicked");
  notifications.forEach((item) => {
    if (item.read === false) {
      item.read = true;
    }
  });
}

export default function NotificationsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative rounded-full">
          {unreadNotifications.length > 0 ? (
            <Badge className="absolute -right-1.5 -top-1.5 m-0 h-5 w-5 items-center justify-center rounded-full p-0 hover:bg-primary">
              {unreadNotifications.length}
            </Badge>
          ) : (
            ""
          )}
          <Bell className="h-5 w-5" />
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel
          className={cn(
            unreadNotifications.length > 0 ? "py-0.5" : "",
            "flex items-center justify-between gap-4",
          )}
        >
          Notifications
          {unreadNotifications.length > 0 ? (
            <Button variant={"ghost"} size={"sm"} onClick={markAllRead}>
              Mark all as read
            </Button>
          ) : (
            ""
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.slice(0, 5).map((notification) => (
          <DropdownMenuItem key={notification.id} className="flex gap-2">
            <Link
              href={`/notifications/${notification.id}`}
              className="flex w-full justify-between space-x-4 p-1 transition-all hover:bg-accent hover:text-accent-foreground"
            >
              <div className="flex items-start space-x-4">
                <notification.icon className="h-5 w-5" />
                <div className="space-y-1">
                  <p className="max-w-60 truncate text-sm font-medium leading-none">
                    {notification.title}
                  </p>
                  <p className="max-w-60 truncate text-sm text-muted-foreground">
                    {notification.subtitle}
                  </p>
                </div>
              </div>
              {notification.read ? (
                <Badge className="h-2 w-2 bg-transparent p-0 hover:bg-transparent" />
              ) : (
                <Badge className="h-2 w-2 bg-primary p-0 hover:bg-primary" />
              )}
            </Link>
          </DropdownMenuItem>
        ))}
        {notifications.length == 0 ? (
          <DropdownMenuItem className="my-2 p-2 focus:bg-transparent">
            You have no notifications
          </DropdownMenuItem>
        ) : (
          ""
        )}
        <Link
          href="/notifications"
          className={buttonVariants({ variant: "secondary" }) + " mt-1 w-full"}
        >
          {notifications.length > 0
            ? "See all notifications"
            : "Notifications Center"}
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
