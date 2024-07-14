"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const isActive = (pathname: string, href: string, title: string) => {
  switch (title) {
    case "Groups":
      return pathname.includes(href.toLowerCase());
    case "Attendance":
      return pathname.includes(href.toLowerCase());
    case "Training":
      return pathname.includes(href.toLowerCase());
    case "Tasks":
      return pathname.includes(href.toLowerCase());
    case "Communications":
      return pathname.includes(href.toLowerCase());
    case "Schedule":
      return pathname.includes(href.toLowerCase());
    default:
      return pathname === href;
  }
};

const NavigationLink = ({
  href,
  title,
  onClick,
  children,
}: {
  href: string;
  title: string;
  onClick?: () => void;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        isActive(pathname, href, title) ? "bg-muted" : "",
        "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
      )}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default NavigationLink;
