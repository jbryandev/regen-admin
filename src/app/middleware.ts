import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

import { getServerAuthSession } from "@/server/auth";

export async function middleware() {
  console.log("middleware running");
  const session = await getServerAuthSession();
  if (!session?.user) {
    redirect("/login");
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - /login
     */
    "/(?!login).*",
  ],
};
