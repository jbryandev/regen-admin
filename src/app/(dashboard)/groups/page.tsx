import { columns } from "@/app/(dashboard)/groups/columns";
import { DataTable } from "@/components/ui/data-table";
import { participants } from "@/lib/data";

export default async function GroupsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Group Roster</h1>
      </div>
      <DataTable columns={columns} data={participants}></DataTable>
    </main>
  );
}
