import { getMeetingsForGroup } from "@/server/queries";

const GroupSchedulePage = async ({
  params,
}: {
  params: { groupId: string };
}) => {
  const meetings = await getMeetingsForGroup(params.groupId);
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Group Schedule</h1>
      </div>
      <div>{meetings.map((meeting) => meeting.date)}</div>
    </>
  );
};

export default GroupSchedulePage;
