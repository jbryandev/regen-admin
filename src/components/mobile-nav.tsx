"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import NavigationLink from "@/components/navigation-link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { leaderMenu, directorMenu, coachMenu, techMenu } from "@/lib/config";
import { type NavigationMenuItem, type NavigationMenu } from "@/lib/types";
import regen from "@/public/ReGen_Icon_Primary.png";

const MobileNav = (menu: NavigationMenu) => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = Array<NavigationMenuItem>();

  switch (menu.variant) {
    case "leader":
      if (!menu.groupId)
        throw new Error("Error getting group id for leader menu");
      navigation.push(...leaderMenu(menu.groupId));
      break;
    case "coach":
      navigation.push(...coachMenu);
      break;
    case "tech":
      navigation.push(...techMenu);
      break;
    default:
      navigation.push(...directorMenu);
      break;
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
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navigation.map((item) => {
              return (
                <NavigationLink
                  key={item.title}
                  href={item.path}
                  title={item.title}
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </NavigationLink>
              );
            })}
          </nav>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
