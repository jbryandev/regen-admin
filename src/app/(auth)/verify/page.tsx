import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import regen from "@/public/ReGen_Icon_Primary.png";
import { getServerAuthSession } from "@/server/auth";

const VerificationCard = async () => {
  // If user already logged in, redirect to dashboard
  const session = await getServerAuthSession();
  if (session?.user) {
    return redirect("/");
  }

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <Image
            src={regen}
            alt="Regen logo"
            height={30}
            className="my-5 self-center"
          />
          <CardTitle className="text-center text-2xl">
            Check your email
          </CardTitle>
          <CardDescription className="text-center">
            A login link has been sent to your email address. This link will
            expire within 24 hours.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            href={"/login"}
            className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
          >
            Back to login
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationCard;
