import { redirect } from "next/navigation";

import { getServerAuthSession } from "@/server/auth";
import { getLeaderGroup } from "@/server/queries";

const GroupsPage = async () => {
  const session = await getServerAuthSession();

  if (session?.user.role === "leader") {
    const group = await getLeaderGroup(session?.user.id);

    redirect(`/groups/${group?.slug}`);
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Groups</h1>
      </div>
    </main>
  );
};

export default GroupsPage;
