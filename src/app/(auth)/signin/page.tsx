"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { useAppDispatch } from "~/lib/hooks";
import { setAuth } from "~/lib/store";
import { me, signIn } from "~/services/auth";
import { storeToken } from "~/services/token";

const SignIn: FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const signInMutation = useMutation({
    mutationKey: ["signIn"],
    mutationFn: async () => {
      try {
        const { accessToken: token } = await signIn(email, senha);
        storeToken(token);
        const user = await me();
        dispatch(setAuth({ user, token }));
        router.push("/");
      } catch (e) {
        // handle error
      }
    },
  });

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-4 md:p-8">
      <div className="flex max-w-96 flex-col gap-8">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold text-primary-dark">Acessar conta</h1>
          <p className="text-text-tertiary">
            Bem-vindo(a)! Por favor, digite suas credenciais para ter acesso ao sistema.
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
            <div className="flex items-center gap-2">
              <Checkbox id="keep-connected" />
              <label htmlFor="keep-connected" className="text-sm text-text-tertiary">
                Deixar-me conectado
              </label>
            </div>

            <div className="flex flex-col gap-2 py-4">
              <Button type="submit" size="lg" className="text-md">
                Entrar na conta
              </Button>
              <div className="flex justify-between">
                <a href="/signup">
                  <Button variant="ghost" className="text-sm font-bold text-text-tertiary">
                    Criar conta
                  </Button>
                </a>
                <Button variant="ghost" className="text-sm font-bold text-text-tertiary">
                  Esqueceu senha?
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
