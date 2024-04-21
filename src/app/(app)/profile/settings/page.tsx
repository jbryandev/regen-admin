// import SettingsForm from "@/app/(app)/profile/settings/form";

const SettingsPage = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="border-b pb-4">
        <h1 className="text-lg font-semibold md:text-2xl">Settings</h1>
        <h2 className="text-sm text-muted-foreground md:text-base">
          Manage your application settings and notifications
        </h2>
      </div>
      {/* <SettingsForm /> */}
    </main>
  );
};

export default SettingsPage;
