"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { z } from "zod";
import { ActivityIndicator } from "~/components/activity-indicator";
import { ControlledInput } from "~/components/controlled-input";
import { Error } from "~/components/error";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { useAppDispatch } from "~/lib/hooks";
import { setAuth } from "~/lib/store";
import { me, signIn } from "~/services/auth";
import { storeToken } from "~/services/token";

const formSchema = z.object({
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

const SignIn: FC = () => {
  const { control, formState, handleSubmit } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      senha: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    console.log(formState.errors);
  }, [formState.errors]);

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const signInMutation = useMutation({
    mutationKey: ["signIn"],
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      try {
        const { accessToken: token } = await signIn(data);
        storeToken(token);
        const user = await me();
        dispatch(setAuth({ user, token }));
        router.push("/");
      } catch (e) {
        // handle error
      }
    },
  });

  const noErrors = Object.keys(formState.errors).length === 0;
  const disabled = !noErrors || !formState.isDirty || signInMutation.isPending;

  return (
    <div className="flex max-w-96 flex-col gap-8">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold text-primary-dark">Acessar conta</h1>
        <p className="text-text-tertiary">
          Bem-vindo(a)! Por favor, digite suas credenciais para ter acesso ao sistema.
        </p>
      </div>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(data => signInMutation.mutate(data))}
      >
        <div className="flex flex-col gap-4">
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

          <div className="flex items-center gap-2">
            <Checkbox id="keep-connected" />
            <label htmlFor="keep-connected" className="text-sm text-text-tertiary">
              Deixar-me conectado
            </label>
          </div>

          <div className="flex flex-col gap-2 py-4">
            <Button type="submit" size="lg" className="text-md" disabled={disabled}>
              {signInMutation.isPending && <ActivityIndicator />}
              Entrar na conta
            </Button>
            {signInMutation.isError && (
              <Error>
                Ocorreu um erro ao tentar acessar a conta. Verifique os dados e tente novamente.
              </Error>
            )}
            <div className="flex justify-between">
              <a href="/signup">
                <Button variant="ghost" className="text-sm font-bold text-text-tertiary">
                  Criar conta
                </Button>
              </a>
              <a href="/forgot-password">
                <Button variant="ghost" className="text-sm font-bold text-text-tertiary">
                  Esqueceu senha?
                </Button>
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
