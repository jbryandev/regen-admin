import { BookOpen } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/server/db";

const MemoryVerseCard = async ({ step }: { step?: number }) => {
  const verse = await db.query.verses.findFirst({
    where: (verse, { eq }) => eq(verse.step, step ?? 0),
  });

  return (
    <Card className="order-3 flex flex-col justify-between sm:order-2">
      <CardHeader className="flex-none">
        <CardDescription className="flex flex-row items-center justify-between space-y-0">
          Memory Verse
          <BookOpen className="h-4 w-4 text-muted-foreground" />
        </CardDescription>
        <CardTitle className="text-xl">
          {verse?.title ?? "Your Choice"}
        </CardTitle>
      </CardHeader>
      <CardContent className="grow text-sm text-muted-foreground">
        {verse?.text ??
          "There is no memory verse defined for this week, so please continue memorizing a foundation verse of your choosing."}
      </CardContent>
    </Card>
  );
};

export default MemoryVerseCard;
