import { redirect } from "next/navigation";

import { getServerAuthSession } from "@/server/auth";
import { getLeaderGroup } from "@/server/queries";

const GroupsPage = async () => {
  const session = await getServerAuthSession();

  if (session?.user.role === "leader") {
    const group = await getLeaderGroup(session?.user.id);

    redirect(`/groups/${group?.id}`);
  }

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-lg font-semibold md:text-2xl">Groups</h1>
    </div>
  );
};

export default GroupsPage;
