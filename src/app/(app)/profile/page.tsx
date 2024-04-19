import ProfileForm from "@/app/(app)/profile/form";

const ProfilePage = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="border-b pb-4">
        <h1 className="text-xl font-semibold md:text-2xl">Profile</h1>
        <h2 className="text-sm text-muted-foreground md:text-base">
          Manage your personal and contact information
        </h2>
      </div>
      <ProfileForm />
    </main>
  );
};

export default ProfilePage;
