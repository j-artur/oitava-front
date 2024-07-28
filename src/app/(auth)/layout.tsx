import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-bg-active">
      <div className="flex h-full w-full shadow-lg md:h-4/5 md:w-3/5">
        <div className="flex h-0 w-0 items-center justify-center bg-primary-dark p-8 md:h-full md:w-1/2">
          <Image
            src="/logo.png"
            width={400}
            height={150}
            alt="Oitava Rosado"
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </div>
        <div className="h-full w-full bg-bg-white md:w-1/2">{children}</div>
      </div>
    </div>
  );
}
