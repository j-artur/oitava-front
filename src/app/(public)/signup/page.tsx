"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { z } from "zod";
import { ActivityIndicator } from "~/components/activity-indicator";
import { ControlledInput } from "~/components/controlled-input";
import { Error } from "~/components/error";
import { Button } from "~/components/ui/button";
import { signUp } from "~/services/auth";

const formSchema = z
  .object({
    nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
    email: z.string().email("E-mail inválido"),
    senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    confirmacaoSenha: z.string(),
  })
  .refine(data => data.senha === data.confirmacaoSenha, {
    message: "As senhas não coincidem",
    path: ["confirmacaoSenha"],
  });

const SignUp: FC = () => {
  const { control, formState, handleSubmit } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      senha: "",
      confirmacaoSenha: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const signUpMutation = useMutation({
    mutationKey: ["signUp"],
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      try {
        await signUp(data);
        router.push("/signin");
      } catch (e) {
        // handle error
      }
    },
  });

  const noErrors = Object.keys(formState.errors).length === 0;
  const disabled = !noErrors || !formState.isDirty || signUpMutation.isPending;

  return (
    <div className="flex max-w-96 flex-col gap-8">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-primary-dark">Criar conta</h1>
        <p className="text-text-tertiary">
          Preencha as informações abaixo para criar uma nova conta no sistema.
        </p>
      </div>

      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(data => signUpMutation.mutate(data))}
      >
        <div className="flex flex-col gap-4">
          <ControlledInput control={control} name="nome" label="Nome" />
          <ControlledInput control={control} name="email" label="E-mail" />

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
            <Button type="submit" size="lg" className="text-md" disabled={disabled}>
              {signUpMutation.isPending && <ActivityIndicator />}
              Finalizar cadastro
            </Button>
            {signUpMutation.isError && (
              <Error>Ocorreu um erro ao criar a conta. Verifique os dados e tente novamente.</Error>
            )}
            <Link href="/signin" className="flex w-full flex-col">
              <Button
                variant="ghost"
                className="text-sm font-bold text-destructive-text hover:bg-destructive-bg"
              >
                Cancelar
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;