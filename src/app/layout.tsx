import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.scss";
import { Providers } from "@/GlobalRedux/provider";
import { Header } from "@/components/Header";
import { ModalContextProvider } from "@/context/ModalContext";
import { ModalLayout } from "@/components/ModalLayout";
import { Container } from "@/components/Container";
import { SessionContextProvider } from "@/context/SessionContext";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Footer } from "@/components/Footer";

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
      <body suppressHydrationWarning={true} className="relative">
        <Providers>
          <SessionContextProvider>
            <ModalContextProvider>
              <ModalLayout />
              <Header />
              <Container>{children}</Container>
              <Footer />
              <ToastContainer />
            </ModalContextProvider>
          </SessionContextProvider>
        </Providers>
        <ScrollToTop />
      </body>
    </html>
  );
}
