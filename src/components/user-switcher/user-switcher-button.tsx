"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { switchUser } from "@/components/user-switcher/actions";

type Props = {
  user: {
    id: string;
    name: string | null;
    email: string;
    image: string | null;
    role: string | null;
  };
  active: boolean;
};

const UserSwitcherButton = ({ user, active }: Props) => {
  const [isPending, setIsPending] = useState(false);

  const handleClick = async () => {
    setIsPending(true);
    await switchUser(user.id);
    setIsPending(false);
  };

  return (
    <Button
      variant={active ? "default" : "secondary"}
      className="flex w-28 gap-2 disabled:opacity-100"
      disabled={active || isPending}
      onClick={handleClick}
    >
      {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
      {active ? "Signed in" : "Switch"}
    </Button>
  );
};

export default UserSwitcherButton;
