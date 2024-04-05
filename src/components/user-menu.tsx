"use client";

import { CircleUser, LogIn, LogOut, Settings, User } from "lucide-react";
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const signedIn = true;

export default function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {signedIn ? (
          <>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex cursor-pointer gap-4">
              <User className="h-5 w-5" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="flex cursor-pointer gap-4">
              <Settings className="h-5 w-5" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex cursor-pointer gap-4"
              onClick={() => signOut()}
            >
              <LogOut className="h-5 w-5" />
              Log out
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem className="flex cursor-pointer gap-4">
            <LogIn className="h-5 w-5" />
            Log in
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
