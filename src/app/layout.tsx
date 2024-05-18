import { Inter } from "next/font/google";
// import Script from "next/script";
import { StrictMode } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StrictMode>
      <html lang="en" suppressHydrationWarning>
        {/* <Script src="http://192.168.1.34:8097" /> */}
        <body className={`font-sans ${inter.variable} h-full`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster visibleToasts={3} />
          </ThemeProvider>
        </body>
      </html>
    </StrictMode>
  );
}
