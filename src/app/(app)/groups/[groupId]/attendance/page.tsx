import { redirect } from "next/navigation";

import { getCurrentMeeting } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { getLeaderGroup, getMeetingsForGroup } from "@/server/queries";

const AttendancePage = async ({ params }: { params: { groupId: string } }) => {
  const session = await getServerAuthSession();

  if (session?.user.role === "leader") {
    const group = await getLeaderGroup(session?.user.id);
    const meetings = await getMeetingsForGroup(group?.id ?? "");
    const currentMeeting = getCurrentMeeting(meetings);

    redirect(`/groups/${params.groupId}/attendance/${currentMeeting?.id}`);
  }

  return (
    <div className="flex items-center justify-between">
      <h1 className="text-lg font-semibold md:text-2xl">Attendance</h1>
    </div>
  );
};

export default AttendancePage;
