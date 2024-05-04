"use client";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

type Props = {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
    role: string;
  };
  disabled: boolean;
};

const UserSwitcherButton = ({ user, disabled }: Props) => {
  const handleClick = async () => {
    // await signIn();
  };

  return (
    <Button
      variant={disabled ? "default" : "secondary"}
      className="w-24"
      disabled={disabled}
      onClick={handleClick}
    >
      {disabled ? "Signed in" : "Switch"}
    </Button>
  );
};

export default UserSwitcherButton;
