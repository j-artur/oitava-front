"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { ControlledInput } from "../controlled-input";

const formSchema = z.object({
  code: z.string().min(6, "Código tem 6 dígitos"),
});

const ForgotPassword: FC = () => {
  const { control, formState } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const noErrors = Object.keys(formState.errors).length === 0;
  const disabled = !noErrors || !formState.isDirty;

  return (
    <div className="flex h-full max-w-96 flex-col gap-8">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-primary-dark">Recuperar acesso</h1>
        <p className="text-text-tertiary">
          Informe o código de recuperação enviado para o seu e-mail e recupere o acesso a sua conta.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <ControlledInput control={control} name="code" label="Código de recuperação" />

        <div className="flex flex-col gap-2 py-4">
          <Link href="/change-password" className="flex w-full flex-col">
            <Button type="submit" size="lg" className="text-md" disabled={disabled}>
              Recuperar acesso
            </Button>
          </Link>
          <Link href="/signin" className="flex w-full flex-col">
            <Button variant="destructive-ghost">Cancelar</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
