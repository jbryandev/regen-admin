"use client";

import { CheckIcon, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const ModeToggle = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="flex w-full cursor-pointer items-center justify-between"
        >
          <div className="flex gap-4">
            <Sun className="h-5 w-5" />
            Light
          </div>
          <CheckIcon
            className={cn(
              useTheme().theme === "light" ? "opacity-100" : "opacity-0",
              "h-4 w-4",
            )}
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="flex w-full cursor-pointer items-center justify-between"
        >
          <div className="flex gap-4">
            <Moon className="h-5 w-5" />
            Dark
          </div>
          <CheckIcon
            className={cn(
              useTheme().theme === "dark" ? "opacity-100" : "opacity-0",
              "h-4 w-4",
            )}
          />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="flex w-full cursor-pointer items-center justify-between gap-4"
        >
          <div className="flex gap-4">
            <Monitor className="h-5 w-5" />
            System
          </div>
          <CheckIcon
            className={cn(
              useTheme().theme === "system" ? "opacity-100" : "opacity-0",
              "h-4 w-4",
            )}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ModeToggle;
