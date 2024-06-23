import { Calendar } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { longDate } from "@/lib/utils";
import { getMeetingsForGroup } from "@/server/queries";

const GroupSchedulePage = async ({
  params,
}: {
  params: { groupId: string };
}) => {
  const meetings = await getMeetingsForGroup(params.groupId);
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
          <BreadcrumbItem>Schedule</BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Group Schedule</h1>
      </div>
      <div className="flex flex-col gap-2">
        {meetings.map((meeting) => {
          return (
            <Card key={meeting.id}>
              <CardContent className="grid items-center gap-4 p-6 text-sm sm:grid-cols-[1fr_auto] md:text-base">
                <div className="font-semibold">{meeting.scheduleItem.name}</div>
                <div className="flex w-48 items-center gap-2 md:w-60">
                  <Calendar className="h-4 w-4" />
                  {longDate(meeting.date)}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default GroupSchedulePage;
