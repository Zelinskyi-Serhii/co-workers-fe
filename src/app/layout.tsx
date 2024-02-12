import type { Metadata } from "next";
import "./globals.css";
import {Providers}  from "@/GlobalRedux/provider";
import { Header } from "@/components/Header";

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
          <Header />
          {children}
        </Providers>
        </body>
    </html>
  );
}
