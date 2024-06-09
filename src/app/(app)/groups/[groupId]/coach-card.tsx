import parsePhoneNumberFromString from "libphonenumber-js";
import { CircleUser, HeartHandshake } from "lucide-react";
import Image from "next/image";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { type GroupLeadershipCardProps } from "@/lib/types";
import { cn } from "@/lib/utils";

const CoachCard = ({ coaches }: { coaches: GroupLeadershipCardProps[] }) => {
  return (
    <Card className="flex flex-col @container">
      <CardHeader className="flex-none">
        <CardDescription className="flex flex-row items-center justify-between space-y-0">
          Group Coach
          <HeartHandshake className="h-4 w-4 text-muted-foreground" />
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-hidden">
        <div className="flex flex-col gap-4 @md:flex-row">
          {coaches.map((coach) => (
            <div key={coach.id} className="flex items-center gap-4 text-sm">
              <div
                className={cn(
                  buttonVariants({
                    variant: "secondary",
                    size: "icon",
                  }),
                  "min-w-[36px] rounded-full",
                )}
              >
                {coach?.image ? (
                  <Image
                    src={coach?.image}
                    alt="Profile image"
                    width={36}
                    height={36}
                    className="rounded-full"
                  />
                ) : (
                  <CircleUser className="h-5 w-5" />
                )}
              </div>
              <div className="flex flex-col">
                <p className="font-medium">{coach?.name}</p>
                <p className="truncate text-muted-foreground">{coach?.email}</p>
                <p className="text-muted-foreground">
                  {parsePhoneNumberFromString(
                    coach?.phone ?? "",
                  )?.formatNational()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CoachCard;
