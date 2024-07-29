import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col p-8">
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <Image src="/logo-image.png" width={120} height={120} alt="Oitava Rosado" />
        <h1 className="text-3xl text-text-primary">
          Seja bem-vindo(a) ao sistema da Clínica Oitava Rosado
        </h1>
        <p className="text-lg text-text-tertiary">
          Navegue pelos itens no menu para ter acesso às funcionalidades
        </p>
      </div>
    </main>
  );
}
