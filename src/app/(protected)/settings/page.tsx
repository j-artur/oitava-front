"use client";

import Image from "next/image";

export default function Settings() {
  return (
    <main className="flex flex-1 flex-col p-8">
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <Image src="/logo-image.png" width={120} height={120} alt="Oitava Rosado" />
        <h1 className="text-3xl text-text-primary">Oops! Ainda não temos essa funcionalidade</h1>
        <p className="text-lg text-text-tertiary">
          Estamos trabalhando para trazer essa funcionalidade o mais rápido possível
        </p>
      </div>
    </main>
  );
}
