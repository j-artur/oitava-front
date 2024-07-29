import { Patient } from "~/lib/types";
import { api } from "./api";

export async function getPatients() {
  const res = await api.get<Patient[]>("/patients");

  return res.data;
}

export async function getPatient(id: number) {
  const res = await api.get<Patient>(`/patients/${id}`);

  return res.data;
}

export async function createPatient(data: Omit<Patient, "id">) {
  const res = await api.post<Patient>("/patients", data);

  return res.data;
}

export async function updatePatient(id: number, data: Omit<Patient, "id">) {
  const res = await api.put<Patient>(`/patients/${id}`, data);

  return res.data;
}

export async function deletePatient(id: number) {
  const res = await api.delete<Patient>(`/patients/${id}`);

  return res.data;
}
