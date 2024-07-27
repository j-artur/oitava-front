import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <Image src="/logo-image.png" width={120} height={120} alt="Oitava Rosado" />
        <h1 className="text-text-dark text-3xl">
          Seja bem-vindo(a) ao sistema da Clínica Oitava Rosado
        </h1>
        <p className="text-text-light text-lg">
          Navegue pelos itens no menu para ter acesso às funcionalidades
        </p>
      </div>
    </main>
  );
}
