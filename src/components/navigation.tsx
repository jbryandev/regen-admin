"use client";

import {
  Home,
  NotebookPen,
  Users,
  Video,
  Mail,
  CalendarDays,
  Music,
  Star,
  HeartHandshake,
  Menu,
} from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import regen from "/public/ReGen_Icon_Primary.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const navigation = [
  {
    title: "Dashboard",
    icon: Home,
    path: "/",
  },
  {
    title: "Participants",
    icon: Users,
    path: "/participants",
  },
  {
    title: "Attendance",
    icon: NotebookPen,
    path: "/attendance",
  },
  {
    title: "Training",
    icon: Video,
    path: "/training",
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
];

export function SidebarNav() {
  const pathname = usePathname();

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

export function MobileNav() {
  const pathname = usePathname();

  return (
    <Sheet>
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
