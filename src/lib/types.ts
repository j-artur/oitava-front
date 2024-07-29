import { Cbo, Conselho, Sexo, Uf } from "./utils";

export type User = {
  id: number;
  nome: string;
  email: string;
};

export type Doctor = {
  id: number;
  nome: string;
  conselho: Conselho;
  conselhoUf: Uf;
  conselhoNum: string;
  cbo: Cbo | null;
  cpf: string;
  logradouro: string;
  bairro: string | null;
  numero: string | null;
  cidade: string | null;
  uf: Uf | null;
  cep: string | null;
  telefone: string | null;
  email: string | null;
  agendamentos: Appointment[];
};

export type Patient = {
  id: number;
  nome: string;
  sexo: Sexo;
  nascimento: Date;
  cpf: string;
  rg: string;
  orgaoEmissor: string | null;
  logradouro: string | null;
  bairro: string | null;
  numero: string | null;
  cidade: string | null;
  uf: Uf | null;
  cep: string | null;
  telefone: string | null;
  email: string;
  observacoes: string | null;
  agendamentos: Appointment[];
};

export type Appointment = {};
