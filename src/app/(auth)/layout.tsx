import { type Metadata } from "next";
import { Inter } from "next/font/google";

import { TailwindIndicator } from "@/components/tailwind-indicator";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import { TRPCReactProvider } from "@/trpc/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${inter.variable} h-full bg-muted`}>
        <TRPCReactProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <TailwindIndicator />
            <Toaster visibleToasts={3} />
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
