import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import regen from "/public/ReGen_Icon_Primary.png";

import { cn } from "@/lib/utils";

const VerificationCard = async () => {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <Image
          src={regen}
          alt="Regen logo"
          height={30}
          className="my-5 self-center"
        />
        <CardTitle className="text-center text-2xl">Check your email</CardTitle>
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
  );
};

export default VerificationCard;
