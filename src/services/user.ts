import { User } from "~/lib/types";
import { api } from "./api";

export async function getUsers() {
  const res = await api.get<User[]>("/users");

  return res.data;
}
