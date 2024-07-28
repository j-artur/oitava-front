import type { Metadata } from "next";
import { Footer } from "~/components/footer";
import { Header } from "~/components/header";
import { Sidenav } from "~/components/sidenav";

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
    <div className="relative flex h-full w-full flex-row justify-between pl-16 text-sm text-text-secondary">
      <Sidenav />
      <div className="flex grow flex-col">
        <Header />
        <div className="flex grow flex-col overflow-auto">
          <div className="flex grow">{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
