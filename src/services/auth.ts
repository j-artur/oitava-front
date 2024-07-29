import { User } from "~/lib/types";
import { api } from "./api";

export async function signIn(data: { email: string; senha: string }) {
  const res = await api.post<{ accessToken: string }>("/signin", data);
  return res.data;
}

export async function signUp(data: { nome: string; email: string; senha: string }) {
  const res = await api.post<User>("/signup", data);
  return res.data;
}

export async function me() {
  const res = await api.get<User>("/me");
  return res.data;
}
