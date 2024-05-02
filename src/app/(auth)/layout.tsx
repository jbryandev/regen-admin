import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Regen Admin - Login",
  description: "Administration site for Re:Generation",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="bg-muted">{children}</div>;
}
