"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FC } from "react";
import { DataTable } from "~/components/data-table";
import { DestructiveAlert } from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { deleteAppointment, getAppointments } from "~/services/appointment";

export const AppointmentsTable: FC = () => {
  const appointments = useQuery({
    queryKey: ["appointments"],
    queryFn: getAppointments,
  });

  const deleteAppointmentMutation = useMutation({
    mutationKey: ["deleteAppointment"],
    mutationFn: (id: number) => deleteAppointment(id),
    onSuccess: () => appointments.refetch(),
  });

  return (
    <DataTable
      isLoading={appointments.isLoading || deleteAppointmentMutation.isPending}
      cols={["Médico - CRM", "Paciente - ID", "Data e hora", "Observações"]}
      data={
        appointments.data?.map(appointment => {
          const date = new Date(appointment.dataHora);

          return {
            "id": appointment.id,
            "Médico - CRM": `${appointment.medico.nome} - ${appointment.medico.conselhoUf}/${appointment.medico.conselhoNum}`,
            "Paciente - ID": `${appointment.paciente.nome} - ${appointment.paciente.id}`,
            "Data e hora": `${date.toLocaleDateString("pt-BR")} às ${date.toLocaleTimeString("pt-BR", { timeStyle: "short" }).replace(":", "h")}`,
            "Observações": appointment.observacoes?.split("\n")?.[0] || "-",
          };
        }) ?? []
      }
      actions={appointment => (
        <div className="flex gap-2">
          <Link href={`/appointments/${appointment.id}/update`}>
            <Button variant="secondary">Editar</Button>
          </Link>
          <DestructiveAlert onConfirm={() => deleteAppointmentMutation.mutate(appointment.id)}>
            <Button variant="destructive-outline">Excluir</Button>
          </DestructiveAlert>
        </div>
      )}
    />
  );
};
