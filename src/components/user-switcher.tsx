import { eq } from "drizzle-orm";
import { CircleUser } from "lucide-react";
import { redirect } from "next/navigation";

import TailwindIndicator from "@/components/tailwind-indicator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import UserSwitcherButton from "@/components/user-switcher-button";
import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { roles, users } from "@/server/db/schema/auth";

const UserSwitcher = async () => {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="fixed bottom-0 z-50 flex w-full justify-center">
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant={"outline"} className="mb-2 flex h-11 w-40 gap-3">
            <TailwindIndicator />
            Switch User
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-md">
            <DrawerHeader>
              <DrawerTitle>Switch User</DrawerTitle>
              <DrawerDescription>
                Sign in as different users and roles
              </DrawerDescription>
            </DrawerHeader>
            <ScrollArea className="h-96">
              <UserPanel />
            </ScrollArea>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant={"outline"}>Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

const UserPanel = async () => {
  const session = await getServerAuthSession();
  if (!session?.user) {
    redirect("/login");
  }

  const logins = await db
    .select({
      id: users.id,
      name: users.name,
      image: users.image,
      email: users.email,
      role: roles.name,
    })
    .from(users)
    .leftJoin(roles, eq(users.roleId, roles.id));

  if (!logins || !session) {
    return null;
  }

  // Map to sort logins by role
  const loginSortMap = {
    Administrator: 1,
    Director: 2,
    Coach: 3,
    Leader: 4,
    Tech: 5,
  };
  logins.sort((x, y) => loginSortMap[x.role!] - loginSortMap[y.role!]);

  return (
    <div className="flex flex-col space-y-4 p-4">
      {logins.map((login) => (
        <div
          key={login.id}
          className="flex items-center justify-between space-x-4"
        >
          <div className="flex items-center space-x-4">
            <Avatar>
              {login.image && <AvatarImage src={login.image} />}
              <AvatarFallback>
                <CircleUser className="h-5 w-5" />
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium leading-none">{login.name}</p>
              <p className="text-sm text-muted-foreground">{login.role}</p>
            </div>
          </div>
          <UserSwitcherButton
            user={login}
            disabled={login.id === session.user.id}
          />
        </div>
      ))}
    </div>
  );
};

export default UserSwitcher;
