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
      <head>
        <link
          rel="icon"
          href="https://res.cloudinary.com/dzuxudptr/image/upload/v1708516652/h6rlzdqtgx9wdvm4nmm7.png"
          type="image/x-icon"
        />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>CO-WORKERS</title>
      </head>
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
