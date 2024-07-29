"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useAppDispatch } from "~/lib/hooks";
import { signUp } from "~/services/auth";

const SignUp: FC = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const signInMutation = useMutation({
    mutationKey: ["signUp"],
    mutationFn: async () => {
      try {
        await signUp(nome, email, senha);
        router.push("/signin");
      } catch (e) {
        // handle error
      }
    },
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4 md:p-8">
      <div className="flex max-w-96 flex-col gap-8">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-primary-dark">Criar conta</h1>
          <p className="text-text-tertiary">
            Preencha as informações abaixo para criar uma nova conta no sistema.
          </p>
        </div>

        <form
          className="flex flex-col gap-4"
          onSubmit={e => {
            e.preventDefault();
            signInMutation.mutate();
          }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="nome" className="font-bold text-text-label">
                Nome
              </label>
              <Input id="nome" type="text" value={nome} onChange={e => setNome(e.target.value)} />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="font-bold text-text-label">
                E-mail
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="font-bold text-text-label">
                Senha
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
                  placeholder="Senha"
                />
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
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="password-confirmation" className="font-bold text-text-label">
                Senha
              </label>
              <div className="relative">
                <Input
                  id="password-confirmation"
                  type={showPassword ? "text" : "password"}
                  value={confirmacaoSenha}
                  onChange={e => setConfirmacaoSenha(e.target.value)}
                />
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
              </div>
            </div>

            <div className="flex flex-col gap-2 py-4">
              <Button size="lg" className="text-md">
                Finalizar cadastro
              </Button>
              <Button
                variant="ghost"
                className="text-sm font-bold text-destructive-text hover:bg-destructive-bg"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
