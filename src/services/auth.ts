import { User } from "~/lib/types";
import { api } from "./api";

export async function signIn(email: string, senha: string) {
  const res = await api.post<{ accessToken: string }>("/signin", { email, senha });
  return res.data;
}

export async function signUp(email: string, senha: string) {
  const res = await api.post<User>("/signup", { email, senha });
  return res.data;
}

export async function me() {
  const res = await api.get<User>("/me");
  return res.data;
}
