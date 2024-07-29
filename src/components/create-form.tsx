import { FC, ReactNode } from "react";

type Props = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

export const CreateForm: FC<Props> = props => {
  return (
    <div className="flex w-full flex-col border-y bg-bg-white px-6 lg:rounded-lg lg:border-x lg:px-14 lg:pb-8 lg:pt-2">
      <div className="flex flex-col gap-2 border-b border-border-dark py-4 lg:py-6">
        <h1 className="text-2xl font-semibold text-text-tertiary">{props.title}</h1>
        <p className="text-xs text-text-label">{props.subtitle}</p>
      </div>

      <form>{props.children}</form>
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
