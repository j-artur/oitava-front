"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Breadcrumbs from "~/components/breadcrumbs";
import { CreateForm, FormSection } from "~/components/create-form";
import { cepMask, cpfMask, rgMask, Sexo, telefoneMask, Uf } from "~/lib/utils";
import { createPatient } from "~/services/patient";
import { ControlledDatePicker } from "../../controlled-datepicker";
import { ControlledInput } from "../../controlled-input";
import { ControlledSelect } from "../../controlled-select";
import { ControlledTextarea } from "../../controlled-textarea";

const formSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  sexo: z.nativeEnum(Sexo, { message: "Selecione uma opção" }),
  nascimento: z.date({ message: "Selecione uma data" }),
  cpf: z
    .string()
    .length(14, "CPF inválido")
    .transform(value => value.replace(/\D/g, "")),
  rg: z
    .string()
    .length(11, "RG inválido")
    .transform(value => value.replace(/\D/g, "")),
  orgaoEmissor: z.string().min(1, "Órgão emissor é obrigatório"),
  logradouro: z.string().min(1, "Logradouro é obrigatório"),
  bairro: z.string().min(1, "Bairro é obrigatório"),
  numero: z.string().min(1, "Número é obrigatório"),
  cidade: z.string().min(1, "Cidade é obrigatório"),
  uf: z.nativeEnum(Uf, { message: "Selecione uma opção" }),
  cep: z
    .string()
    .length(9, "CEP inválido")
    .transform(value => value.replace(/\D/g, "")),
  telefone: z
    .string()
    .length(15, "Telefone inválido")
    .transform(value => value.replace(/\D/g, "")),
  email: z.string().email("Email inválido"),
  observacoes: z.string(),
});

export default function CreatePatient() {
  const { control, formState, handleSubmit } = useForm({
    defaultValues: {
      nome: "",
      sexo: null as unknown as Sexo,
      nascimento: null as unknown as Date,
      cpf: "",
      rg: "",
      orgaoEmissor: "",
      logradouro: "",
      bairro: "",
      numero: "",
      cidade: "",
      uf: null as unknown as Uf,
      cep: "",
      telefone: "",
      email: "",
      observacoes: "",
    },
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const router = useRouter();

  const createPatientMutation = useMutation({
    mutationKey: ["createPatient"],
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      await createPatient(data);
      router.push("/patients");
    },
  });

  const noErrors = Object.keys(formState.errors).length === 0;
  const disabled = !noErrors || createPatientMutation.isPending;

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
              onSubmit={handleSubmit(data => createPatientMutation.mutate(data))}
              isLoading={createPatientMutation.isPending}
              disabled={disabled}
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
                <ControlledDatePicker
                  control={control}
                  name="nascimento"
                  label="Data de nascimento"
                  mode="far"
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
                  mask={rgMask}
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
                  mask={cepMask}
                />
              </FormSection>
              <FormSection title="Contato">
                <ControlledInput
                  control={control}
                  name="telefone"
                  label="Telefone"
                  placeholder="Informe um número de telefone"
                  mask={telefoneMask}
                />
                <ControlledInput
                  control={control}
                  name="email"
                  label="Email"
                  placeholder="Informe um e-mail válido"
                />
              </FormSection>
              <FormSection title="Observações">
                <ControlledTextarea
                  control={control}
                  name="observacoes"
                  label="Observações"
                  placeholder="Escreva aqui suas observações"
                  className="col-span-3"
                />
              </FormSection>
            </CreateForm>
          </div>
        </div>
      </div>
    </main>
  );
}
