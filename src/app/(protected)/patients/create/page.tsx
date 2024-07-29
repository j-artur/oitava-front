"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Breadcrumbs from "~/components/breadcrumbs";
import { CreateForm, FormSection } from "~/components/create-form";
import { cpfMask, Sexo, Uf } from "~/lib/utils";
import { ControlledInput } from "../../controlled-input";
import { ControlledSelect } from "../../controlled-select";

const formSchema = z.object({
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  sexo: z.nativeEnum(Sexo, { message: "Selecione uma opção" }),
  nascimento: z.string(),
  cpf: z
    .string()
    .length(14, "CPF inválido")
    .transform(value => value.replace(/\D/g, "")),
  rg: z.string().length(9, "RG inválido"),
  orgaoEmissor: z.string(),
  logradouro: z.string(),
  bairro: z.string(),
  numero: z.string(),
  cidade: z.string(),
  uf: z.nativeEnum(Uf, { message: "Selecione uma opção" }),
  cep: z.string().length(8, "CEP inválido"),
  telefone: z.string().length(11, "Telefone inválido"),
  email: z.string().email("Email inválido"),
  observacoes: z.string(),
});

export default function CreatePatient() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      nome: "",
      sexo: null,
      nascimento: "",
      cpf: "",
      rg: "",
      orgaoEmissor: "",
      logradouro: "",
      bairro: "",
      numero: "",
      cidade: "",
      uf: null,
      cep: "",
      telefone: "",
      email: "",
      observacoes: "",
    },
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
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
                    { route: "/patients", label: "Pacientes" },
                    { route: "/patients/create", label: "Criar novo paciente" },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="w-full pt-2 lg:w-3/4">
            <CreateForm
              title="Criar novo paciente"
              subtitle="Preencha os campos abaixo para criar um novo paciente no sistema"
            >
              <FormSection title="Informações gerais">
                <ControlledInput
                  control={control}
                  name="nome"
                  label="Nome completo"
                  placeholder="Informe o nome do paciente"
                />
                <ControlledSelect
                  control={control}
                  name="sexo"
                  label="Sexo"
                  data={Object.keys(Sexo) as Sexo[]}
                  dataValue={value => value}
                  render={value => value}
                />
                <ControlledInput
                  control={control}
                  name="nascimento"
                  label="Data de nascimento"
                  placeholder="Informe a data de nascimento do paciente"
                />
                <ControlledInput
                  control={control}
                  name="cpf"
                  label="CPF"
                  placeholder="Informe o CPF do paciente"
                  mask={cpfMask}
                />
                <ControlledInput
                  control={control}
                  name="rg"
                  label="RG"
                  placeholder="Informe o RG do paciente"
                />
                <ControlledInput
                  control={control}
                  name="orgaoEmissor"
                  label="Órgão emissor"
                  placeholder="Informe o órgão emissor"
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
                <ControlledSelect
                  control={control}
                  name="uf"
                  label="UF"
                  data={Object.keys(Uf) as Uf[]}
                  dataValue={value => value}
                  render={value => value}
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
              <FormSection title="Observações">{null}</FormSection>
            </CreateForm>
          </div>
        </div>
      </div>
    </main>
  );
}
