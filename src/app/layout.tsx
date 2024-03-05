import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.scss";
import { Providers } from "@/GlobalRedux/provider";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "CO-WORKERS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <Providers>
          <Header />
          <div className="max-w-[1200px] mx-auto px-4 py-8">{children}</div>
          <ToastContainer />
        </Providers>
      </body>
    </html>
  );
}
