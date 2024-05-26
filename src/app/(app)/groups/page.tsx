import { getServerAuthSession } from "@/server/auth";

const GroupsPage = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerAuthSession();
  const role = session?.user.role;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">Groups</h1>
      </div>
      {children}
    </main>
  );
};

export default GroupsPage;
