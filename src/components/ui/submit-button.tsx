import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Button, type ButtonProps } from "@/components/ui/button";

type SubmitButtonProps = {
  children: React.ReactNode;
  variant?: ButtonProps["variant"];
  action?: (payload: FormData) => void;
};

const SubmitButton = ({ children, variant, action }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      formAction={action}
      type="submit"
      variant={variant}
      disabled={pending}
      className="flex gap-2"
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
};

export default SubmitButton;
