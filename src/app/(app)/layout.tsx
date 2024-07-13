import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import ModeToggle from "@/components/mode-toggle";
import { MobileNav, SidebarNav } from "@/components/navigation";
// import NotificationsMenu from "@/components/notifications-menu";
import { Input } from "@/components/ui/input";
import UserMenu from "@/components/user-menu";
import UserSwitcher from "@/components/user-switcher/user-switcher";
import { type NavigationMenu } from "@/lib/types";
import regen from "@/public/ReGen_Icon_Primary.png";
import { getServerAuthSession } from "@/server/auth";
import { getLeaderGroup } from "@/server/queries";

export const metadata = {
  title: "Regen Admin",
  description: "Administration site for Re:Generation",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const AppLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerAuthSession();
  if (!session?.user) {
    redirect("/login");
  }

  const user = {
    name: session.user.name ?? null,
    image: session.user.image ?? null,
  };

  let navigation = {} as NavigationMenu;

  if (session.user.role === "leader") {
    const group = await getLeaderGroup(session.user.id);
    if (!group) throw new Error("Group not found");
    navigation = { type: "leader", group: group?.id };
  } else {
    navigation = { type: "default" };
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image src={regen} alt="Regen logo" height={30} />
              <span className="">Administration</span>
            </Link>
          </div>
          <div className="flex-1">
            {navigation.type === "leader" ? (
              <SidebarNav type={navigation.type} groupId={navigation.group} />
            ) : (
              <SidebarNav type={navigation.type} />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-3 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          {navigation.type === "leader" ? (
            <MobileNav type={navigation.type} groupId={navigation.group} />
          ) : (
            <MobileNav type={navigation.type} />
          )}
          <div className="w-full flex-1">
            <form>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  disabled={true}
                />
              </div>
            </form>
          </div>
          {/* <NotificationsMenu /> */}
          <ModeToggle />
          <UserMenu user={user} />
        </header>
        {children}
      </div>
      <UserSwitcher />
    </div>
  );
};

export default AppLayout;
