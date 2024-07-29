"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Breadcrumbs from "~/components/breadcrumbs";
import { CreateForm, FormSection } from "~/components/create-form";
import { cpfMask } from "~/lib/utils";
import { ControlledInput } from "../../controlled-input";

const formSchema = z.object({
  nome: z.string().min(3, "Nome muito curto").max(255, "Nome muito longo"),
  conselho: z.string().min(1, "Conselho é obrigatório"),
  conselhoUf: z.string().length(2, "UF do conselho é obrigatório"),
  conselhoNum: z.string().min(1, "Número do conselho é obrigatório"),
  cbo: z.string(),
  cpf: z.string().length(11, "CPF inválido"),
  logradouro: z.string(),
  bairro: z.string(),
  numero: z.string(),
  cidade: z.string(),
  uf: z.string().length(2, "UF inválida"),
  cep: z.string().length(8, "CEP inválido"),
  telefone: z.string().length(11, "Telefone inválido"),
  email: z.string().email("Email inválido"),
});

export default function CreateDoctor() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      nome: "",
      conselho: "",
      conselhoUf: "",
      conselhoNum: "",
      cbo: "",
      cpf: "",
      logradouro: "",
      bairro: "",
      numero: "",
      cidade: "",
      uf: "",
      cep: "",
      telefone: "",
      email: "",
    },
    resolver: zodResolver(formSchema),
    mode: "onBlur",
  });

  return (
    <main className="flex flex-1 flex-col">
      <div className="fixed top-0 -z-10 h-1/3 w-full bg-primary-dark" />
      <div className="fixed top-1/3 -z-10 h-2/3 w-full bg-bg-white" />
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex w-full max-w-full shrink flex-col items-center">
          <div className="flex w-full flex-col bg-primary-dark pb-2 lg:items-center">
            <div className="flex flex-row flex-wrap items-center justify-between gap-2 px-4 pt-4 lg:w-3/4 lg:px-0">
              <div className="flex flex-col pt-4 lg:pt-8">
                <Breadcrumbs
                  path={[
                    { route: "/doctors", label: "Médicos" },
                    { route: "/doctors/create", label: "Criar novo médico" },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="w-full pt-2 lg:w-3/4">
            <CreateForm
              title="Criar novo Médico"
              subtitle="Preencha os campos abaixo para criar um novo médico no sistema"
            >
              <FormSection title="Informações gerais">
                <ControlledInput
                  control={control}
                  name="nome"
                  label="Nome completo"
                  placeholder="Informe o nome do médico"
                />
                <ControlledInput
                  control={control}
                  name="conselho"
                  label="Conselho"
                  placeholder="Informe o conselho"
                />
                <ControlledInput
                  control={control}
                  name="conselhoUf"
                  label="UF do conselho"
                  placeholder="Informe a UF do conselho"
                />
                <ControlledInput
                  control={control}
                  name="conselhoNum"
                  label="Nº do conselho"
                  placeholder="Informe o número do conselho"
                />
                <ControlledInput
                  control={control}
                  name="cbo"
                  label="Classificação Brasileira de Ocupações (CBO)"
                  placeholder="Informe o CBO"
                />
                <ControlledInput
                  control={control}
                  name="cpf"
                  label="CPF"
                  placeholder="Informe o CPF"
                  mask={cpfMask}
                />
              </FormSection>
              <FormSection title="Endereço">
                <ControlledInput
                  control={control}
                  name="logradouro"
                  label="Logradouro"
                  placeholder="Informe o logradouro"
                />
                <ControlledInput
                  control={control}
                  name="bairro"
                  label="Bairro"
                  placeholder="Informe o bairro"
                />
                <ControlledInput
                  control={control}
                  name="numero"
                  label="Número"
                  placeholder="Informe o número"
                />
                <ControlledInput
                  control={control}
                  name="cidade"
                  label="Cidade"
                  placeholder="Informe a cidade"
                />
                <ControlledInput
                  control={control}
                  name="uf"
                  label="UF"
                  placeholder="Informe a UF"
                />
                <ControlledInput
                  control={control}
                  name="cep"
                  label="CEP"
                  placeholder="Informe o CEP"
                />
              </FormSection>
              <FormSection title="Contato">
                <ControlledInput
                  control={control}
                  name="telefone"
                  label="Telefone"
                  placeholder="Informe um número de telefone"
                />
                <ControlledInput
                  control={control}
                  name="email"
                  label="Email"
                  placeholder="Informe um e-mail válido"
                />
              </FormSection>
            </CreateForm>
          </div>
        </div>
      </div>
    </main>
  );
}
