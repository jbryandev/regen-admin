"use client";

import {
  Home,
  User,
  Users,
  Video,
  Mail,
  CalendarDays,
  Music,
  Star,
  HeartHandshake,
  Menu,
  ListChecks,
  UserCheck,
  type LucideIcon,
  Award,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import regen from "@/public/ReGen_Icon_Primary.png";

export type Navigation = Array<{
  title: string;
  icon: LucideIcon;
  path: string;
}>;

export const leaderNavigation = [
  {
    title: "Dashboard",
    icon: Home,
    path: "/",
  },
  {
    title: "Group",
    icon: Users,
    path: "/groups/",
  },
  {
    title: "Attendance",
    icon: UserCheck,
    path: "/attendance",
  },
  {
    title: "Training",
    icon: Video,
    path: "/training",
  },
  {
    title: "Tasks",
    icon: ListChecks,
    path: "/tasks",
  },
  {
    title: "Communications",
    icon: Mail,
    path: "/communications",
  },
  {
    title: "Schedule",
    icon: CalendarDays,
    path: "/schedule",
  },
];

export const defaultNavigation: Navigation = [
  {
    title: "Dashboard",
    icon: Home,
    path: "/",
  },
  {
    title: "Groups",
    icon: Users,
    path: "/groups",
  },
  {
    title: "Participants",
    icon: User,
    path: "/participants",
  },
  {
    title: "Leaders",
    icon: Star,
    path: "/leaders",
  },
  {
    title: "Coaches",
    icon: Award,
    path: "/coaches",
  },
  {
    title: "Mentors",
    icon: HeartHandshake,
    path: "/mentors",
  },
  {
    title: "Worship",
    icon: Music,
    path: "/worship",
  },
];

const isActive = (path: string, pathname: string[]) => {
  if (pathname[1] === "" && path === "/") {
    // Dashboard page is active
    return true;
  } else if (
    pathname[1] === "groups" &&
    pathname.length <= 3 &&
    path === "/groups"
  ) {
    // Groups page is active
    return true;
  } else if (pathname[3] === "attendance" && path === "/attendance") {
    // Attendance page is active
    return true;
  } else if (pathname[3] === "training" && path === "/training") {
    // Training page is active
    return true;
  } else if (pathname[3] === "tasks" && path === "/tasks") {
    // Tasks page is active
    return true;
  } else if (pathname[3] === "communications" && path === "/communications") {
    // Communications page is active
    return true;
  } else if (pathname[3] === "schedule" && path === "/schedule") {
    // Schedule page is active
    return true;
  } else {
    return false;
  }
};

export const SidebarNav = ({
  type,
  groupId,
}: {
  type: "leader" | "default";
  groupId?: string;
}) => {
  let navigation = [];
  if (type === "leader") {
    navigation = [
      {
        title: "Dashboard",
        icon: Home,
        path: "/",
      },
      {
        title: "Group",
        icon: Users,
        path: "/groups/" + groupId,
      },
      {
        title: "Attendance",
        icon: UserCheck,
        path: "/groups/" + groupId + "/attendance",
      },
      {
        title: "Training",
        icon: Video,
        path: "/groups/" + groupId + "/training",
      },
      {
        title: "Tasks",
        icon: ListChecks,
        path: "/groups/" + groupId + "/tasks",
      },
      {
        title: "Communications",
        icon: Mail,
        path: "/groups/" + groupId + "/communications",
      },
      {
        title: "Schedule",
        icon: CalendarDays,
        path: "/groups/" + groupId + "/schedule",
      },
    ];
  } else {
    navigation = defaultNavigation;
  }

  // const pathname = "/" + usePathname().split("/")[1];
  const pathname = usePathname().split("/");

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navigation.map((item) => {
        return (
          <Link
            key={item.title}
            href={item.path}
            className={cn(
              isActive(item.path, pathname) ? "bg-muted" : "",
              "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
            )}
          >
            <item.icon className="h-4 w-4" />
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
};

export function MobileNav({
  type,
  groupId,
}: {
  type: "leader" | "default";
  groupId?: string;
}) {
  const pathname = usePathname().split("/");
  const [isOpen, setIsOpen] = useState(false);

  let navigation = [];
  if (type === "leader") {
    navigation = [
      {
        title: "Dashboard",
        icon: Home,
        path: "/",
      },
      {
        title: "Group",
        icon: Users,
        path: "/groups/" + groupId,
      },
      {
        title: "Attendance",
        icon: UserCheck,
        path: "/groups/" + groupId + "/attendance",
      },
      {
        title: "Training",
        icon: Video,
        path: "/groups/" + groupId + "/training",
      },
      {
        title: "Tasks",
        icon: ListChecks,
        path: "/groups/" + groupId + "/tasks",
      },
      {
        title: "Communications",
        icon: Mail,
        path: "/groups/" + groupId + "/communications",
      },
      {
        title: "Schedule",
        icon: CalendarDays,
        path: "/groups/" + groupId + "/schedule",
      },
    ];
  } else {
    navigation = defaultNavigation;
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <Link
            href="#"
            className="mb-4 flex items-center gap-2 text-lg font-semibold"
          >
            <Image src={regen} alt="Regen logo" height={30} />
            <span className="sr-only">Regen Admin</span>
          </Link>
          {navigation.map((item) => (
            <Link
              key={item.title}
              href={item.path}
              className={cn(
                isActive(item.path, pathname) ? "bg-muted" : "",
                "mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
              )}
              onClick={() => setIsOpen(!isOpen)}
            >
              <item.icon className="h-5 w-5" />
              {item.title}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
