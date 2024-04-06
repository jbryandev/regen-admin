import Link from "next/link";

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

const AlertModal = ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}) => {
  const dialog = {
    title: "",
    description: "",
  };
  const slug = params?.slug ?? "";
  const error = searchParams?.error;
  const isOpen = Boolean(error);

  if (isOpen) {
    if (error === "AccessDenied") {
      dialog.title = "Access Denied";
      dialog.description = "You do not have permission to sign in.";
    } else if (error === "Configuration") {
      dialog.title = "Configuration Error";
      dialog.description = "There is a problem with the server configuration.";
    } else if (error === "Verification") {
      dialog.title = "Verification Error";
      dialog.description =
        "The login link is no longer valid. It may have been used already or it may have expired.";
    } else {
      dialog.title = "Something has gone wrong";
      dialog.description = "Unable to log in. Please try again later.";
    }
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialog.title}</AlertDialogTitle>
          <AlertDialogDescription>{dialog.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>
            <Link href={`/${slug}`}>Ok</Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertModal;
