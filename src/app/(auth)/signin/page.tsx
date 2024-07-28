"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { Input } from "~/components/ui/input";
import { useAppDispatch } from "~/lib/hooks";
import { setAuth } from "~/lib/store";
import { me, signIn } from "~/services/auth";
import { storeToken } from "~/services/token";

const SignIn: FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const dispatch = useAppDispatch();

  const router = useRouter();

  const signInMutation = useMutation({
    mutationKey: ["signIn"],
    mutationFn: async () => {
      const { accessToken: token } = await signIn(email, senha);
      storeToken(token);
      const user = await me();
      dispatch(setAuth({ user, token }));
      router.push("/");
    },
  });

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 md:p-8">
      <div className="flex flex-col gap-4">
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
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-bold text-text-label">
              E-mail
            </label>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-bold text-text-label">
              Senha
            </label>
            <Input type="password" value={senha} onChange={e => setSenha(e.target.value)} />
          </div>

          <button className="btn btn-primary">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
