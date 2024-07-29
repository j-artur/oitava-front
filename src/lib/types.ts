export type User = {
  id: number;
  nome: string;
  email: string;
};

export type Doctor = {
  id: number;
  nome: string;
  conselho: string;
  conselhoUf: string;
  conselhoNum: string;
  cbo: string | null;
  cpf: string;
  logradouro: string;
  bairro: string | null;
  numero: string | null;
  cidade: string | null;
  uf: string | null;
  cep: string | null;
  telefone: string | null;
  email: string | null;
  agendamentos: Appointment[];
};

export const Sexo = {
  Masculino: "Masculino",
  Feminino: "Feminino",
};

export type Sexo = (typeof Sexo)[keyof typeof Sexo];

export type Patient = {
  id: number;
  nome: string;
  sexo: Sexo;
  nascimento: string;
  cpf: string;
  rg: string;
  orgaoEmissor: string | null;
  logradouro: string | null;
  bairro: string | null;
  numero: string | null;
  cidade: string | null;
  uf: string | null;
  cep: string | null;
  telefone: string | null;
  email: string;
  observacoes: string | null;
  agendamentos: Appointment[];
};

export type Appointment = {};
