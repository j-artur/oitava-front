import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-bg-active">
      <div className="flex h-full w-full shadow-lg lg:h-4/5 lg:w-3/5">
        <div className="flex h-0 w-0 items-center justify-center bg-primary-dark sm:h-full sm:w-1/2 sm:p-8">
          <Image
            src="/logo.png"
            width={400}
            height={150}
            alt="Oitava Rosado"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </div>
        <div className="flex h-full w-full flex-1 shrink flex-col items-center justify-center gap-4 bg-bg-white p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
