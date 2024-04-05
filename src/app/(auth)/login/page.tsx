import { redirect } from "next/navigation";

import LoginForm from "@/app/(auth)/login/form";
import { getServerAuthSession } from "@/server/auth";

export default async function LoginPage() {
  // If user already logged in, redirect to dashboard
  const session = await getServerAuthSession();
  if (session?.user) {
    return redirect("/");
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <LoginForm />
    </div>
  );
}
