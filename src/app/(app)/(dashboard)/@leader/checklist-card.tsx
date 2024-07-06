import { Circle, ListChecks } from "lucide-react";
import { type z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { type taskSchema } from "@/server/db/schema/app";

type Task = z.infer<typeof taskSchema>;

const ChecklistCard = ({ tasks }: { tasks?: Task[] }) => {
  return (
    <Card className="order-3 col-span-2 flex flex-col justify-between xl:order-2">
      <CardHeader className="flex-none">
        <CardDescription className="flex flex-row items-center justify-between space-y-0">
          Checklist
          <ListChecks className="h-4 w-4 text-muted-foreground" />
        </CardDescription>
      </CardHeader>
      <CardContent className="grow">
        <Table>
          <TableBody>
            {tasks && tasks.length > 0 ? (
              tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="w-5">
                    <Circle className="h-4 w-4 text-muted-foreground" />
                  </TableCell>
                  <TableCell>{task.description}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No tasks for this week!</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <Button variant={"secondary"} className="w-full">
          See all tasks
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChecklistCard;
