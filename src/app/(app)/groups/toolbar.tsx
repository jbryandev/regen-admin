"use client";

import { type Table } from "@tanstack/react-table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <Tabs defaultValue="all" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="all" onClick={() => table.resetColumnFilters()}>
            All
          </TabsTrigger>
          <TabsTrigger
            value="in"
            onClick={() =>
              table.getColumn("status")?.setFilterValue("checkedin")
            }
          >
            Checked In
          </TabsTrigger>
          <TabsTrigger
            value="out"
            onClick={() =>
              table.getColumn("status")?.setFilterValue("notcheckedin")
            }
          >
            Not Checked In
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
