import { redirect } from "next/navigation";

import { getCurrentMeeting } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { getLeaderGroup, getMeetingsForGroup } from "@/server/queries";

const AttendancePage = async () => {
  const session = await getServerAuthSession();

  if (session?.user.role === "leader") {
    const group = await getLeaderGroup(session?.user.id);
    const meetings = await getMeetingsForGroup(group?.id ?? "");
    const currentMeeting = getCurrentMeeting(meetings);

    redirect(`/attendance/${currentMeeting?.id}`);
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Attendance</h1>
      </div>
    </main>
  );
};

export default AttendancePage;
