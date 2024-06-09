import Attendance from "@/app/(app)/attendance/[meetingId]/attendance";
import MeetingSelector from "@/app/(app)/attendance/[meetingId]/meeting-selector";
import { fixedDate } from "@/lib/utils";
import { getMeetingById, getMeetingsForAttendance } from "@/server/queries";

const AttendancePage = async ({
  params,
}: {
  params: { meetingId: string };
}) => {
  const currentMeeting = await getMeetingById(params.meetingId);

  const meetings = await getMeetingsForAttendance(
    currentMeeting?.groupId ?? "",
  );

  return (
    <>
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">
            {currentMeeting?.scheduleItem.name}
          </h1>
          <p className="text-sm text-muted-foreground md:text-base">
            {fixedDate(currentMeeting?.date ?? "").toLocaleDateString("en-US", {
              dateStyle: "long",
            })}
          </p>
        </div>
        <MeetingSelector meetings={meetings} />
      </div>
      {currentMeeting && <Attendance meeting={currentMeeting} />}
    </>
  );
};

export default AttendancePage;
