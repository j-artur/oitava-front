"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Breadcrumbs from "~/components/breadcrumbs";
import { FormContainer, FormSection } from "~/components/form-container";
import { cepMask, cpfMask, rgMask, Sexo, telefoneMask, Uf } from "~/lib/utils";
import { getPatient, updatePatient } from "~/services/patient";
import { ControlledDatePicker } from "../../../controlled-datepicker";
import { ControlledInput } from "../../../controlled-input";
import { ControlledSelect } from "../../../controlled-select";
import { ControlledTextarea } from "../../../controlled-textarea";

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
  logradouro: z.string(),
  bairro: z.string(),
  numero: z.string(),
  cidade: z.string(),
  uf: z.nativeEnum(Uf, { message: "Selecione uma opção" }).nullable(),
  cep: z
    .string()
    .length(9, "CEP inválido")
    .transform(value => value.replace(/\D/g, ""))
    .or(z.string()),
  telefone: z
    .string()
    .length(15, "Telefone inválido")
    .transform(value => value.replace(/\D/g, "")),
  email: z.string().email("Email inválido"),
  observacoes: z.string(),
});

export default function UpdatePatient() {
  const params = useParams();
  const id = Number(params.id);

  const { control, formState, setValue, handleSubmit } = useForm({
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
      uf: null as Uf | null,
      cep: "",
      telefone: "",
      email: "",
      observacoes: "",
    },
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const patient = useQuery({
    queryKey: ["patient", id],
    queryFn: () => getPatient(id),
  });

  useEffect(() => {
    if (patient.data) {
      setValue("nome", patient.data.nome);
      setValue("sexo", patient.data.sexo);
      setValue("nascimento", new Date(patient.data.nascimento));
      setValue("cpf", cpfMask(patient.data.cpf));
      setValue("rg", rgMask(patient.data.rg));
      setValue("orgaoEmissor", patient.data.orgaoEmissor ?? "");
      setValue("logradouro", patient.data.logradouro ?? "");
      setValue("bairro", patient.data.bairro ?? "");
      setValue("numero", patient.data.numero ?? "");
      setValue("cidade", patient.data.cidade ?? "");
      setValue("uf", patient.data.uf);
      setValue("cep", cepMask(patient.data.cep ?? ""));
      setValue("telefone", telefoneMask(patient.data.telefone ?? ""));
      setValue("email", patient.data.email);
      setValue("observacoes", patient.data.observacoes ?? "");
    }
  }, [patient.data, setValue]);

  const router = useRouter();

  const updatePatientMutation = useMutation({
    mutationKey: ["updatePatient"],
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      await updatePatient(id, data);
      router.push("/patients");
    },
  });

  const noErrors = Object.keys(formState.errors).length === 0;
  const disabled = !noErrors || updatePatientMutation.isPending;

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
                    { route: "/patients/update", label: "Editar paciente" },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="w-full pt-2 lg:w-3/4">
            <FormContainer
              title="Editar paciente"
              subtitle="Edite os campos abaixo para atualizar o paciente no sistema"
              onSubmit={handleSubmit(data => updatePatientMutation.mutate(data))}
              isLoading={updatePatientMutation.isPending}
              disabled={disabled}
              error={updatePatientMutation.error?.message}
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
            </FormContainer>
          </div>
        </div>
      </div>
    </main>
  );
}
