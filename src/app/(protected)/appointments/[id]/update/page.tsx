"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ActivityIndicator } from "~/components/activity-indicator";
import Breadcrumbs from "~/components/breadcrumbs";
import { FormContainer, FormSection } from "~/components/form-container";
import { appoinmentTimes } from "~/lib/utils";
import { getAppointment, updateAppointment } from "~/services/appointment";
import { getDoctors } from "~/services/doctor";
import { getPatients } from "~/services/patient";
import { ControlledDatePicker } from "../../../controlled-datepicker";
import { ControlledInput } from "../../../controlled-input";
import { ControlledSelect } from "../../../controlled-select";
import { ControlledTextarea } from "../../../controlled-textarea";

const formSchema = z.object({
  medicoId: z.number({ message: "Selecione um médico" }),
  pacienteId: z.number({ message: "Selecione um paciente" }),
  motivo: z.string().min(1, "Motivo é obrigatório"),
  data: z.date({ message: "Selecione uma data" }),
  hora: z.string().min(1, "Hora é obrigatória"),
  local: z.string().min(1, "Local é obrigatório"),
  observacoes: z.string(),
});

export default function UpdateAppointment() {
  const params = useParams();
  const id = Number(params.id);

  const { control, formState, setValue, handleSubmit } = useForm({
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

  const appointment = useQuery({
    queryKey: ["appointment", id],
    queryFn: () => getAppointment(id),
  });

  const doctors = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });

  const patients = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });

  useEffect(() => {
    if (appointment.data) {
      const date = new Date(appointment.data.dataHora);

      const data = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
      const hora = date.toLocaleTimeString("pt-BR", { timeStyle: "short" });

      setValue("medicoId", appointment.data.medico.id);
      setValue("pacienteId", appointment.data.paciente.id);
      setValue("motivo", appointment.data.motivo);
      setValue("data", data);
      setValue("hora", hora);
      setValue("local", appointment.data.local);
      setValue("observacoes", appointment.data.observacoes ?? "");
    }
  }, [appointment.data, setValue]);

  const queryClient = useQueryClient();
  const router = useRouter();

  const updateAppointmentMutation = useMutation({
    mutationKey: ["updateAppointment"],
    mutationFn: (data: z.infer<typeof formSchema>) => updateAppointment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      router.push("/appointments");
    },
  });

  const noErrors = Object.keys(formState.errors).length === 0;
  const disabled = !noErrors || updateAppointmentMutation.isPending;

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
                    { route: "/appointments/update", label: "Editar agendamento médico" },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="w-full pt-2 lg:w-3/4">
            <FormContainer
              title="Editar agendamento médico"
              subtitle="Edite os campos abaixo para atualizar o agendamento médico no sistema"
              onSubmit={handleSubmit(data => updateAppointmentMutation.mutate(data))}
              isLoading={updateAppointmentMutation.isPending}
              disabled={disabled}
              error={updateAppointmentMutation.error?.message}
            >
              <FormSection>
                {doctors.data ? (
                  <ControlledSelect
                    control={control}
                    name="medicoId"
                    label="Médico"
                    data={doctors.data ?? []}
                    dataValue={value => value.id}
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
                    dataValue={value => value.id}
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
                  disabled={appointment.isLoading}
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
