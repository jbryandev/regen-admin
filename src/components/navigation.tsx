"use client";

import {
  Home,
  Users,
  Video,
  Mail,
  CalendarDays,
  Music,
  Star,
  HeartHandshake,
  Menu,
  ListChecks,
  KeyRound,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import regen from "@/public/ReGen_Icon_Primary.png";

export type Navigation = {
  title: string;
  icon: LucideIcon;
  path: string;
}[];

export const leaderNavigation: Navigation = [
  {
    title: "Dashboard",
    icon: Home,
    path: "/",
  },
  {
    title: "Group",
    icon: Users,
    path: "/groups",
  },
];

export const defaultNavigation: Navigation = [
  {
    title: "Dashboard",
    icon: Home,
    path: "/",
  },
  {
    title: "Group",
    icon: Users,
    path: "/groups",
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
  {
    title: "Leaders",
    icon: Star,
    path: "/leaders",
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
  {
    title: "Roles",
    icon: KeyRound,
    path: "/roles",
  },
];

export function SidebarNav({ navigation }: { navigation: Navigation }) {
  const pathname = "/" + usePathname().split("/")[1];

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navigation.map((item) => (
        <Link
          key={item.title}
          href={item.path}
          className={cn(
            pathname === item.path ? "bg-muted" : "",
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

export function MobileNav({ navigation }: { navigation: Navigation }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

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
                pathname === item.path ? "bg-muted" : "",
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
