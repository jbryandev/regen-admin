import { redirect } from "next/navigation";

import { getServerAuthSession } from "@/server/auth";
import { getLeaderGroup } from "@/server/queries";

const AttendancePage = async () => {
  const session = await getServerAuthSession();

  if (session?.user.role === "leader") {
    const group = await getLeaderGroup(session?.user.id);
    redirect(`/groups/${group?.id}/attendance`);
  }

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-lg font-semibold md:text-2xl">Attendance</h1>
    </div>
  );
};

export default AttendancePage;
