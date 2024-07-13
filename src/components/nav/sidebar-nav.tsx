import { usePathname } from "next/navigation";

import { getServerAuthSession } from "@/server/auth";

export const SidebarNav = async () => {
  const session = await getServerAuthSession();
  const pathname = usePathname().split("/");
};
