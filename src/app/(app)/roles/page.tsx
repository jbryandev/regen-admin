export default async function RolesPage() {
  const roles = await api.role.list();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Roles</h1>
      </div>
      {roles.map((role) => (
        <li key={role.id}>{role.name}</li>
      ))}
    </main>
  );
}
