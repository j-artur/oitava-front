import { Appointment } from "~/lib/types";
import { api } from "./api";

export async function getAppointments() {
  const res = await api.get<Appointment[]>("/appointments");

  return res.data;
}

export async function getAppointment(id: number) {
  const res = await api.get<Appointment>(`/appointments/${id}`);

  return res.data;
}

type CreateAppointment = {
  medicoId: number;
  pacienteId: number;
  motivo: string;
  data: Date;
  hora: string;
  local: string;
  observacoes?: string;
};

export async function createAppointment(data: CreateAppointment) {
  const res = await api.post<Appointment>("/appointments", data);

  return res.data;
}

type UpdateAppointment = {
  motivo: string;
  data: Date;
  hora: string;
  local: string;
  observacoes?: string;
};

export async function updateAppointment(id: number, data: UpdateAppointment) {
  const res = await api.put<Appointment>(`/appointments/${id}`, data);

  return res.data;
}

export async function deleteAppointment(id: number) {
  const res = await api.delete<Appointment>(`/appointments/${id}`);

  return res.data;
}
