import Attendance from "@/app/(app)/groups/[groupId]/attendance/[meetingId]/attendance";
import MeetingSelector from "@/app/(app)/groups/[groupId]/attendance/[meetingId]/meeting-selector";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { fixedDate } from "@/lib/utils";
import { getMeetingById, getMeetingsForAttendance } from "@/server/queries";

const AttendancePage = async ({
  params,
}: {
  params: { groupId: string; meetingId: string };
}) => {
  const currentMeeting = await getMeetingById(params.meetingId);

  const meetings = await getMeetingsForAttendance(
    currentMeeting?.groupId ?? "",
  );

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/groups/${params.groupId}`}>
              Group
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Attendance</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="border-b pb-4">
        <h1 className="text-xl font-semibold md:text-2xl">Attendance</h1>
      </div>
      <div className="flex items-center gap-4 text-sm text-muted-foreground md:text-base">
        <p>{currentMeeting?.scheduleItem.name}</p>
        <MeetingSelector meetings={meetings} />
      </div>
      {currentMeeting && <Attendance meeting={currentMeeting} />}
    </>
  );
};

export default AttendancePage;
