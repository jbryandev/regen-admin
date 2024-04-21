"use client";

import { CircleUser, LogIn, LogOut, Settings, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";

import ModeToggle from "@/components/mode-toggle";
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

type UserMenuProps = {
  image?: string | null;
  name?: string | null;
};

const UserMenu = ({ user }: { user: UserMenuProps }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          className="relative rounded-full"
        >
          {user.image ? (
            <Image src={user.image} alt="Profile image" fill />
          ) : (
            <CircleUser className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {signedIn ? (
          <>
            <DropdownMenuLabel>{`${user.name}`}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex cursor-pointer gap-4">
                <User className="h-5 w-5" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild disabled={true}>
              <Link
                href="/profile/settings"
                className="flex cursor-pointer gap-4"
              >
                <Settings className="h-5 w-5" />
                Settings
              </Link>
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
};

export default UserMenu;
