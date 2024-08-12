import { type Metadata } from "next";
import { Inter } from "next/font/google";
import { StrictMode } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Regen Admin - Login",
  description: "Administration site for Re:Generation",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <StrictMode>
      <html lang="en" suppressHydrationWarning>
        <body className={`font-sans ${inter.variable} h-full`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="bg-muted">{children}</div>
            <Toaster visibleToasts={3} />
          </ThemeProvider>
        </body>
      </html>
    </StrictMode>
  );
};

export default AuthLayout;
