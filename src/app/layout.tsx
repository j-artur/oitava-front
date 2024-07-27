import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { Sidenav } from "~/components/sidenav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clínica Oitava Rosado",
  description: "Sistema de gestão da Clínica Oitava Rosado",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="text-text-normal flex min-h-screen flex-row justify-between bg-bg-white text-sm">
          <Sidenav />
          <div className="flex flex-1 flex-col">
            <Header />
            <div className="flex flex-1">{children}</div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
