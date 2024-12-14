import type { Metadata } from "next";
import {Inter} from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils"
import { QueryProvider } from "@/components/query-provider";

const inter  = Inter({
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(inter.className, "antialiased min-h-screen")}
      >
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
