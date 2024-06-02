import { CalendarDays } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";

type DashboardProps = {
  children: React.ReactNode;
  leader: React.ReactNode;
  admin: React.ReactNode;
};

const DashboardLayout = async ({ children, leader, admin }: DashboardProps) => {
  const session = await getServerAuthSession();
  const role = session?.user.role ?? "";

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      {children}
      {role === "leader" && leader}
      {role === "admin" && admin}
    </main>
  );
};

export default DashboardLayout;
