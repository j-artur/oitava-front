import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryProvider } from "./query-provider";
import StoreProvider from "./store-provider";

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
    <StoreProvider>
      <QueryProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </QueryProvider>
    </StoreProvider>
  );
}
