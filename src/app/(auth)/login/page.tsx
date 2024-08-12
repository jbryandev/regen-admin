import { redirect } from "next/navigation";

import LoginForm from "@/app/(auth)/login/form";

const LoginPage = async ({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  // If user already logged in, redirect to dashboard
  // const session = await getServerAuthSession();
  // if (session?.user) {
  //   return redirect("/");
  // }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <LoginForm params={searchParams} />
    </div>
  );
};

export default LoginPage;
