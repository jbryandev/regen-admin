"use client";

import { Button } from "@/components/ui/button";

type Props = {
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    role: string | null;
  };
  disabled: boolean;
};

const UserSwitcherButton = ({ user, disabled }: Props) => {
  const handleClick = () => {
    return user;
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
