import { Button } from "~/components/ui/button";
import { DoctorsTable } from "./doctors";

const doctors = [
  {
    id: 1,
    nome: "Bruna Rodrigues",
    conselho: "CRM",
    conselhoUF: "RN",
    numeroConselho: "21890",
    cbo: null,
    cpf: "12345678910",
    logradouro: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: "",
    telefone: "",
    email: "",
  },
  {
    id: 2,
    nome: "Thaisa Helena de Paula Azanha",
    conselho: "CRM",
    conselhoUF: "RN",
    numeroConselho: "21891",
    cbo: null,
    cpf: "12345678911",
    logradouro: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: "",
    telefone: "",
    email: "",
  },
  {
    id: 3,
    nome: "Maria Eduarda",
    conselho: "CRM",
    conselhoUF: "RN",
    numeroConselho: "21892",
    cbo: null,
    cpf: "12345678912",
    logradouro: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: "",
    telefone: "",
    email: "",
  },
  {
    id: 4,
    nome: "José Carlos",
    conselho: "CRM",
    conselhoUF: "RN",
    numeroConselho: "21893",
    cbo: null,
    cpf: "12345678913",
    logradouro: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: "",
    telefone: "",
    email: "",
  },
  {
    id: 5,
    nome: "Ana Paula",
    conselho: "CRM",
    conselhoUF: "RN",
    numeroConselho: "21894",
    cbo: null,
    cpf: "12345678914",
    logradouro: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: "",
    telefone: "",
    email: "",
  },
  {
    id: 6,
    nome: "Lucas Silva",
    conselho: "CRM",
    conselhoUF: "RN",
    numeroConselho: "21895",
    cbo: null,
    cpf: "12345678915",
    logradouro: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: "",
    telefone: "",
    email: "",
  },
  {
    id: 7,
    nome: "Juliana Santos",
    conselho: "CRM",
    conselhoUF: "RN",
    numeroConselho: "21896",
    cbo: null,
    cpf: "12345678916",
    logradouro: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: "",
    telefone: "",
    email: "",
  },
  {
    id: 8,
    nome: "Ricardo Oliveira",
    conselho: "CRM",
    conselhoUF: "RN",
    numeroConselho: "21897",
    cbo: null,
    cpf: "12345678917",
    logradouro: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: "",
    telefone: "",
    email: "",
  },
  {
    id: 9,
    nome: "Fernanda Lima",
    conselho: "CRM",
    conselhoUF: "RN",
    numeroConselho: "21898",
    cbo: null,
    cpf: "12345678918",
    logradouro: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: "",
    telefone: "",
    email: "",
  },
  {
    id: 10,
    nome: "Marcos Santos",
    conselho: "CRM",
    conselhoUF: "RN",
    numeroConselho: "21899",
    cbo: null,
    cpf: "12345678919",
    logradouro: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: "",
    telefone: "",
    email: "",
  },
  {
    id: 11,
    nome: "Mariana Silva",
    conselho: "CRM",
    conselhoUF: "RN",
    numeroConselho: "21900",
    cbo: null,
    cpf: "12345678920",
    logradouro: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: "",
    telefone: "",
    email: "",
  },
  {
    id: 12,
    nome: "João Oliveira",
    conselho: "CRM",
    conselhoUF: "RN",
    numeroConselho: "21901",
    cbo: null,
    cpf: "12345678921",
    logradouro: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: "",
    telefone: "",
    email: "",
  },
];

export default function Doctors() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="fixed top-0 -z-10 h-1/3 w-full bg-primary-dark" />
      <div className="fixed top-1/3 -z-10 h-2/3 w-full bg-bg-white" />
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex w-full max-w-full shrink flex-col items-center gap-4">
          <div className="flex w-full flex-col bg-primary-dark md:w-4/5">
            <div className="flex flex-col justify-between gap-2 px-4 pt-4 md:flex-row md:items-center md:px-0">
              <div className="flex flex-col">
                <h1 className="text-3xl font-bold text-white">Médicos</h1>
                <p className="font-medium text-white/90">
                  Gerencie com eficiência e segurança os médicos da clínica
                </p>
              </div>
              <div className="flex">
                <Button variant="primary">Novo Médico</Button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-4/5">
            <DoctorsTable data={doctors} />
          </div>
        </div>
      </div>
    </main>
  );
}
