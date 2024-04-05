"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

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

type Error = {
  title: string;
  description: string;
};

const AuthErrorPage = () => {
  const params = useSearchParams().get("error");
  const error = {} as Error;

  if (params === "AccessDenied") {
    error.title = "Access Denied";
    error.description = "You do not have permission to sign in.";
  } else if (params === "Configuration") {
    error.title = "Configuration Error";
    error.description = "There is a problem with the server configuration.";
  } else if (params === "Verification") {
    error.title = "Verification Error";
    error.description =
      "The login link is no longer valid. It may have been used already or it may have expired.";
  } else {
    error.title = "Something has gone wrong";
    error.description = "Unable to log in. Please try again later.";
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
          <CardTitle className="text-center text-2xl">{error.title}</CardTitle>
          <CardDescription className="text-center">
            {error.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            href={"/login"}
            className={cn(buttonVariants({ variant: "default" }), "w-full")}
          >
            Back to login
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthErrorPage;
