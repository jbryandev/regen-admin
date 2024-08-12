"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { login } from "@/app/(auth)/login/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { type LoginFormData } from "@/lib/types";
import regen from "@/public/ReGen_Icon_Primary.png";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type LoginFormProps = {
  params?: Record<string, string | string[] | undefined>;
};

const LoginForm = ({ params }: LoginFormProps) => {
  const [isEmailLoading, setIsEmailLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function handleEmailSubmit(data: LoginFormData) {
    setIsEmailLoading(true);

    const result = await login(data);

    if (!result) {
      setIsEmailLoading(false);
      return;
    } else {
      router.push("/");
    }
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
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{params.error}</AlertDescription>
            </Alert>
          )}
          <Form {...form}>
            <form
              className="flex flex-col gap-2"
              onSubmit={form.handleSubmit(handleEmailSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="mt-4 w-full"
                disabled={isEmailLoading}
                type="submit"
              >
                {isEmailLoading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Log in
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
