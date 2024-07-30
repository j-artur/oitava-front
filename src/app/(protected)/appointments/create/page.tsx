"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ActivityIndicator } from "~/components/activity-indicator";
import Breadcrumbs from "~/components/breadcrumbs";
import { FormContainer, FormSection } from "~/components/form-container";
import { appoinmentTimes } from "~/lib/utils";
import { createAppointment } from "~/services/appointment";
import { getDoctors } from "~/services/doctor";
import { getPatients } from "~/services/patient";
import { ControlledDatePicker } from "../../controlled-datepicker";
import { ControlledInput } from "../../controlled-input";
import { ControlledSelect } from "../../controlled-select";
import { ControlledTextarea } from "../../controlled-textarea";

const formSchema = z.object({
  medicoId: z.number({ message: "Selecione um médico" }),
  pacienteId: z.number({ message: "Selecione um paciente" }),
  motivo: z.string().min(1, "Motivo é obrigatório"),
  data: z.date({ message: "Selecione uma data" }),
  hora: z.string().min(1, "Hora é obrigatória"),
  local: z.string().min(1, "Local é obrigatório"),
  observacoes: z.string(),
});

export default function CreateAppointment() {
  const { control, formState, handleSubmit } = useForm({
    defaultValues: {
      medicoId: null as unknown as number,
      pacienteId: null as unknown as number,
      motivo: "",
      data: null as unknown as Date,
      hora: "",
      local: "",
      observacoes: "",
    },
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const doctors = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });

  const patients = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const createAppointmentMutation = useMutation({
    mutationKey: ["createAppointment"],
    mutationFn: (data: z.infer<typeof formSchema>) => createAppointment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      router.push("/appointments");
    },
  });

  const noErrors = Object.keys(formState.errors).length === 0;
  const disabled = !noErrors || createAppointmentMutation.isPending;

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
                    { route: "/appointments", label: "Agendamentos médicos" },
                    { route: "/appointments/create", label: "Criar novo agendamento médico" },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="w-full pt-2 lg:w-3/4">
            <FormContainer
              title="Criar novo agendamento médico"
              subtitle="Preencha os campos abaixo para criar um novo agendamento médico no sistema"
              onSubmit={handleSubmit(data => createAppointmentMutation.mutate(data))}
              isLoading={createAppointmentMutation.isPending}
              disabled={disabled}
              error={createAppointmentMutation.error?.message}
            >
              <FormSection>
                {doctors.data ? (
                  <ControlledSelect
                    control={control}
                    name="medicoId"
                    label="Médico"
                    data={doctors.data ?? []}
                    dataValue={value => value?.id}
                    render={value => value.nome}
                  />
                ) : (
                  <ActivityIndicator />
                )}
                {patients.data ? (
                  <ControlledSelect
                    control={control}
                    name="pacienteId"
                    label="Paciente"
                    data={patients.data ?? []}
                    dataValue={value => value?.id}
                    render={value => value.nome}
                  />
                ) : (
                  <ActivityIndicator />
                )}
                <ControlledInput
                  control={control}
                  name="motivo"
                  label="Motivo da consulta"
                  placeholder="Informe um motivo"
                />
                <ControlledDatePicker
                  control={control}
                  name="data"
                  label="Data da consulta"
                  mode="near"
                />
                <ControlledSelect
                  control={control}
                  name="hora"
                  label="Hora da consulta"
                  data={appoinmentTimes}
                  dataValue={value => value}
                  render={value => value}
                />
                <ControlledInput
                  control={control}
                  name="local"
                  label="Local da consulta"
                  placeholder="Informe o local da consulta"
                />
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
