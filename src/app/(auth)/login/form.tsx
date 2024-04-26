"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GoogleIcon from "@/components/ui/google-icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SubmitButton from "@/components/ui/submit-button";
import regen from "@/public/ReGen_Icon_Primary.png";
import { userProfileSchema } from "@/server/db/schema";

const LoginForm = () => {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get("email");
    if (email) {
      const emailSchema = userProfileSchema.pick({
        email: true,
      });
      const parse = emailSchema.safeParse({
        email,
      });

      if (!parse.success) {
        const message = fromZodError(parse.error).toString();
        router.push(`/login?error=${message}`);
        return false;
      }

      const loginResult = await signIn("email", {
        email: parse.data.email.toLowerCase(),
        redirect: false,
        callbackUrl: "/",
      });

      if (loginResult?.error) {
        router.push(`/login?error=${loginResult.error}`);
      } else {
        router.push("/login?verify=1");
      }
    } else {
      await signIn("google", {
        callbackUrl: "/",
      });
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <Image
          src={regen}
          alt="Regen logo"
          height={30}
          className="my-5 self-center"
        />
        <CardTitle className="text-center text-2xl">
          Re:Generation Admin
        </CardTitle>
        <CardDescription className="text-center">
          Please enter your email below to log in to your account. A login link
          will be emailed to you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <form id="email" className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="name@example.com"
                required
              />
            </div>
            <SubmitButton action={handleSubmit}>Log in with email</SubmitButton>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <form id="google" className="flex flex-col gap-4">
            <div id="google" className="flex flex-col gap-2">
              <SubmitButton action={handleSubmit} variant="outline">
                <GoogleIcon className="h-4 w-4" />
                Google
              </SubmitButton>
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
