import { Doctor } from "~/lib/types";
import { api } from "./api";

export async function getDoctors() {
  const res = await api.get<Doctor[]>("/doctors");

  return res.data;
}

export async function getDoctor(id: number) {
  const res = await api.get<Doctor>(`/doctors/${id}`);

  return res.data;
}

export async function createDoctor(data: Omit<Doctor, "id">) {
  const res = await api.post<Doctor>("/doctors", data);

  return res.data;
}

export async function updateDoctor(id: number, data: Omit<Doctor, "id">) {
  const res = await api.put<Doctor>(`/doctors/${id}`, data);

  return res.data;
}

export async function deleteDoctor(id: number) {
  const res = await api.delete<Doctor>(`/doctors/${id}`);

  return res.data;
}
