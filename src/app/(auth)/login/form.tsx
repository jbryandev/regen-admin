"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
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
import regen from "@/public/ReGen_Icon_Primary.png";
import { userSchema } from "@/server/db/schema";

const emailSchema = userSchema.pick({
  email: true,
});
type FormData = z.infer<typeof emailSchema>;

type LoginFormProps = {
  params?: Record<string, string | string[] | undefined>;
};

const LoginForm = ({ params }: LoginFormProps) => {
  const [isEmailLoading, setIsEmailLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(emailSchema),
  });

  async function handleEmailSubmit(data: FormData) {
    setIsEmailLoading(true);

    await signIn("email", {
      email: data.email.toLowerCase(),
      callbackUrl: "/",
    });
  }

  async function handleGoogleSubmit() {
    setIsGoogleLoading(true);

    await signIn("google", {
      callbackUrl: "/",
    });
  }

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
          {params?.error && (
            <Alert variant={"destructive"}>
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertTitle>
                {getDescriptiveAuthError(params.error).title}
              </AlertTitle>
              <AlertDescription>
                {getDescriptiveAuthError(params.error).description}
              </AlertDescription>
            </Alert>
          )}
          <form
            id="email"
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(handleEmailSubmit)}
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                {...register("email")}
              />
              {errors?.email && (
                <Alert variant={"destructive"}>
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{errors.email.message}</AlertDescription>
                </Alert>
              )}
            </div>
            <Button className="w-full" disabled={isEmailLoading} type="submit">
              {isEmailLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Log in with email
            </Button>
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
          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full"
              disabled={isGoogleLoading}
              onClick={handleGoogleSubmit}
            >
              {isGoogleLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              <GoogleIcon className="mr-2 h-4 w-4" />
              Google
            </Button>
            {/* Add other providers here */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const getDescriptiveAuthError = (error: string | string[]) => {
  const errorMessage = {
    title: "",
    description: "",
  };

  if (error === "AccessDenied") {
    errorMessage.title = "Access Denied";
    errorMessage.description =
      "You are not currently authorized to access this resource.";
  } else if (error === "Configuration") {
    errorMessage.title = "Configuration Error";
    errorMessage.description =
      "There is a problem with the server configuration. Please try again later.";
  } else if (error === "Verification") {
    errorMessage.title = "Verification failed";
    errorMessage.description =
      "Login link no longer valid. It may have been used already or it may have expired.";
  } else {
    errorMessage.title = "Something has gone wrong";
    errorMessage.description = "Unable to log in. Please try again later.";
  }

  return errorMessage;
};

export default LoginForm;
