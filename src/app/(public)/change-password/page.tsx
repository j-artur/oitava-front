"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { ControlledInput } from "../controlled-input";

const formSchema = z
  .object({
    senha: z.string().min(3, "Senha deve ter no mínimo 3 caracteres"),
    confirmacaoSenha: z.string(),
  })
  .refine(data => data.senha === data.confirmacaoSenha, {
    message: "As senhas não coincidem",
    path: ["confirmacaoSenha"],
  });

const ChangePassword: FC = () => {
  const { control, formState } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      senha: "",
      confirmacaoSenha: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  const [showPassword, setShowPassword] = useState(false);

  const noErrors = Object.keys(formState.errors).length === 0;
  const disabled = !noErrors || !formState.isDirty;

  return (
    <div className="flex h-full max-w-96 flex-col gap-8">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-primary-dark">Alterar senha</h1>
        <p className="text-text-tertiary">Altere sua senha e recupere o acesso ao sistema.</p>
      </div>

      <div className="flex flex-col gap-4">
        <ControlledInput
          control={control}
          name="senha"
          label="Senha"
          type={showPassword ? "text" : "password"}
          icon={
            <Button
              variant="ghost"
              className="absolute right-0 top-0 hover:bg-none"
              size="icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <HiOutlineEyeSlash className="text-text-eye" size={20} />
              ) : (
                <HiOutlineEye className="text-text-eye" size={20} />
              )}
            </Button>
          }
        />
        <ControlledInput
          control={control}
          name="confirmacaoSenha"
          label="Confirmação de senha"
          type={showPassword ? "text" : "password"}
          icon={
            <Button
              variant="ghost"
              className="absolute right-0 top-0 hover:bg-none"
              size="icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <HiOutlineEyeSlash className="text-text-eye" size={20} />
              ) : (
                <HiOutlineEye className="text-text-eye" size={20} />
              )}
            </Button>
          }
        />
        <div className="flex flex-col gap-2 py-4">
          <Link href="/signin" className="flex w-full flex-col">
            <Button type="submit" size="lg" className="text-md" disabled={disabled}>
              Confirmar alteração
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

export default ChangePassword;
