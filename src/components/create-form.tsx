import { useRouter } from "next/navigation";
import { FC, FormEventHandler, ReactNode } from "react";
import { Button } from "./ui/button";

type Props = {
  title: string;
  subtitle: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
};

export const CreateForm: FC<Props> = props => {
  const router = useRouter();

  return (
    <div className="flex w-full flex-col border-y bg-bg-white px-6 lg:rounded-lg lg:border-x lg:px-14 lg:pb-8 lg:pt-2">
      <div className="flex flex-col gap-2 border-b border-border-dark py-4 lg:py-6">
        <h1 className="text-2xl font-semibold text-text-tertiary">{props.title}</h1>
        <p className="text-xs text-text-label">{props.subtitle}</p>
      </div>

      <form onSubmit={props.onSubmit}>{props.children}</form>
      <div className="flex justify-end gap-2 pt-4">
        <Button variant="destructive-ghost" onClick={() => router.back()}>
          Cancelar
        </Button>
        <Button type="submit">Salvar informações</Button>
      </div>
    </div>
  );
};

type SectionProps = {
  title?: string;
  children: ReactNode;
};

export const FormSection: FC<SectionProps> = props => {
  return (
    <div className="flex flex-col gap-2 border-b border-border-dark py-4 lg:py-6">
      {props.title && <h2 className="pb-2 font-semibold text-primary-darker">{props.title}</h2>}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">{props.children}</div>
    </div>
  );
};
