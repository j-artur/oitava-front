"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Breadcrumbs from "~/components/breadcrumbs";
import { FormContainer, FormSection } from "~/components/form-container";
import { Cbo, cepMask, Conselho, cpfMask, descricaoCbo, telefoneMask, Uf } from "~/lib/utils";
import { getDoctor, updateDoctor } from "~/services/doctor";
import { ControlledInput } from "../../../controlled-input";
import { ControlledSelect } from "../../../controlled-select";

const formSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  conselho: z.nativeEnum(Conselho, { message: "Selecione uma opção" }),
  conselhoUf: z.nativeEnum(Uf, { message: "Selecione uma opção" }),
  conselhoNum: z.string().min(1, "Número do conselho é obrigatório"),
  cbo: z.nativeEnum(Cbo, { message: "Selecione uma opção" }).nullable(),
  cpf: z
    .string()
    .length(14, "CPF inválido")
    .transform(value => value.replace(/\D/g, "")),
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
});

export default function UpdateDoctor() {
  const params = useParams();
  const id = Number(params.id);

  const { control, formState, setValue, handleSubmit } = useForm({
    defaultValues: {
      nome: "",
      conselho: null as unknown as Conselho,
      conselhoUf: null as unknown as Uf,
      conselhoNum: "",
      cbo: null as Cbo | null,
      cpf: "",
      logradouro: "",
      bairro: "",
      numero: "",
      cidade: "",
      uf: null as Uf | null,
      cep: "",
      telefone: "",
      email: "",
    },
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const doctor = useQuery({
    queryKey: ["doctor", id],
    queryFn: () => getDoctor(id),
  });

  useEffect(() => {
    if (doctor.data) {
      setValue("nome", doctor.data.nome);
      setValue("conselho", doctor.data.conselho);
      setValue("conselhoUf", doctor.data.conselhoUf);
      setValue("conselhoNum", doctor.data.conselhoNum);
      setValue("cbo", doctor.data.cbo);
      setValue("cpf", cpfMask(doctor.data.cpf));
      setValue("logradouro", doctor.data.logradouro ?? "");
      setValue("bairro", doctor.data.bairro ?? "");
      setValue("numero", doctor.data.numero ?? "");
      setValue("cidade", doctor.data.cidade ?? "");
      setValue("uf", doctor.data.uf);
      setValue("cep", cepMask(doctor.data.cep ?? ""));
      setValue("telefone", telefoneMask(doctor.data.telefone ?? ""));
      setValue("email", doctor.data.email ?? "");
    }
  }, [doctor.data, setValue]);

  const router = useRouter();

  const updateDoctorMutation = useMutation({
    mutationKey: ["updateDoctor"],
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      await updateDoctor(id, data);
      router.push("/doctors");
    },
  });

  const noErrors = Object.keys(formState.errors).length === 0;
  const disabled = !noErrors || updateDoctorMutation.isPending;

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
                    { route: "/doctors/update", label: "Editar médico" },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="w-full pt-2 lg:w-3/4">
            <FormContainer
              title="Editar médico"
              subtitle="Edite os campos abaixo para atualizar o médico no sistema"
              onSubmit={handleSubmit(data => updateDoctorMutation.mutate(data))}
              isLoading={updateDoctorMutation.isPending}
              disabled={disabled}
              error={updateDoctorMutation.error?.message}
            >
              <FormSection title="Informações gerais">
                <ControlledInput
                  control={control}
                  name="nome"
                  label="Nome completo"
                  placeholder="Informe o nome do médico"
                />
                <ControlledSelect
                  control={control}
                  name="conselho"
                  label="Conselho"
                  data={Object.values(Conselho) as Conselho[]}
                  dataValue={value => value}
                  render={value => value}
                />
                <ControlledSelect
                  control={control}
                  name="conselhoUf"
                  label="UF do conselho"
                  data={Object.keys(Uf) as Uf[]}
                  dataValue={value => value}
                  render={value => value}
                />
                <ControlledInput
                  control={control}
                  name="conselhoNum"
                  label="Nº do conselho"
                  placeholder="Informe o número do conselho"
                />
                <ControlledSelect
                  control={control}
                  name="cbo"
                  label="Classificação Brasileira de Ocupações (CBO)"
                  data={Object.keys(Cbo) as Cbo[]}
                  dataValue={value => value}
                  render={value => `${value} - ${descricaoCbo[value]}`}
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
            </FormContainer>
          </div>
        </div>
      </div>
    </main>
  );
}
