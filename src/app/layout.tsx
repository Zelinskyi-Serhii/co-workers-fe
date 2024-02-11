import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Providers}  from "@/GlobalRedux/provider";

export const metadata: Metadata = {
  title: "CO-WORKERS"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
        </body>
    </html>
  );
}
