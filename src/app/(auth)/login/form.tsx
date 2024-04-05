"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, type LucideProps } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import regen from "/public/ReGen_Icon_Primary.png";

export default function LoginForm() {
  const [isEmailLoading, setIsEmailLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [dialogMessage, setDialogMessage] = useState({
    title: "",
    description: "",
  });

  const router = useRouter();

  const formSchema = z.object({
    email: z.string().email(),
  });

  type FormData = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function emailSubmit(data: FormData) {
    setIsEmailLoading(true);

    const loginResult = await signIn("email", {
      email: data.email.toLowerCase(),
      redirect: false,
      callbackUrl: "/",
    });

    setIsEmailLoading(false);

    if (loginResult?.error) {
      if (loginResult.error === "AccessDenied") {
        setDialogMessage({
          title: "Access Denied",
          description: "You do not have permission to log in.",
        });
      } else {
        setDialogMessage({
          title: "Something has gone wrong",
          description: "Unable to log in. Please try again later.",
        });
      }

      setIsDialogOpen(true);
      return false;
    }

    return router.push("/auth/verify");
  }

  async function googleSubmit() {
    setIsGoogleLoading(true);

    await signIn("google", {
      callbackUrl: "/",
    });
  }

  return (
    <>
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
            Please enter your email below to log in to your account. A log in
            link will be emailed to you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <form
              onSubmit={handleSubmit(emailSubmit)}
              className="flex flex-col gap-4"
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
                  <p className="px-1 text-sm text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <Button
                className="w-full"
                disabled={isEmailLoading}
                type="submit"
              >
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
                onClick={googleSubmit}
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
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogTrigger />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{dialogMessage.title}</AlertDialogTitle>
            <AlertDialogDescription>
              {dialogMessage.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Ok</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

const GoogleIcon = (props: LucideProps) => (
  <svg viewBox="0 0 30 30" {...props}>
    <path
      fill="currentColor"
      d="M 15.003906 3 C 8.3749062 3 3 8.373 3 15 C 3 21.627 8.3749062 27 15.003906 27 C 25.013906 27 27.269078 17.707 26.330078 13 L 25 13 L 22.732422 13 L 15 13 L 15 17 L 22.738281 17 C 21.848702 20.448251 18.725955 23 15 23 C 10.582 23 7 19.418 7 15 C 7 10.582 10.582 7 15 7 C 17.009 7 18.839141 7.74575 20.244141 8.96875 L 23.085938 6.1289062 C 20.951937 4.1849063 18.116906 3 15.003906 3 z"
    ></path>
  </svg>
);
