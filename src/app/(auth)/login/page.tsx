import { redirect } from "next/navigation";

import LoginForm from "@/app/(auth)/login/form";
import AlertModal from "@/app/(auth)/login/modal";
import VerificationCard from "@/app/(auth)/login/verify";
import { getServerAuthSession } from "@/server/auth";

const LoginPage = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  // If user already logged in, redirect to dashboard
  const session = await getServerAuthSession();
  if (session?.user) {
    return redirect("/");
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      {searchParams?.verify === "1" ? (
        <VerificationCard />
      ) : (
        <>
          <LoginForm />
          <AlertModal params={params} searchParams={searchParams} />
        </>
      )}
    </div>
  );
};

export default LoginPage;
