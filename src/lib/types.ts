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
};
