import "@/styles/globals.css";

import { Search } from "lucide-react";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import ModeToggle from "@/components/mode-toggle";
import { MobileNav, SidebarNav } from "@/components/navigation";
// import NotificationsMenu from "@/components/notifications-menu";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { Input } from "@/components/ui/input";
import { Toaster } from "@/components/ui/sonner";
import UserMenu from "@/components/user-menu";
import regen from "@/public/ReGen_Icon_Primary.png";
import { getServerAuthSession } from "@/server/auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Regen Admin",
  description: "Administration site for Re:Generation",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Require users to be logged in to access all parts of application
  const session = await getServerAuthSession();
  if (!session?.user) {
    redirect("/login");
  }

  const user = {
    name: session.user.name,
    image: session.user.image,
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable} h-full`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
              <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                  <Link
                    href="/"
                    className="flex items-center gap-2 font-semibold"
                  >
                    <Image src={regen} alt="Regen logo" height={30} />
                    <span className="">Administration</span>
                  </Link>
                </div>
                <div className="flex-1">
                  <SidebarNav />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <header className="flex h-14 items-center gap-3 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                <MobileNav />
                <div className="w-full flex-1">
                  <form>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
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
          </div>
          <Toaster visibleToasts={3} />
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
