"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FC } from "react";
import { DataTable } from "~/components/data-table";
import { DestructiveAlert } from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { deletePatient, getPatients } from "~/services/patient";

export const PatientsTable: FC = () => {
  const patients = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });

  const deletePatientMutation = useMutation({
    mutationKey: ["deletePatient"],
    mutationFn: (id: number) => deletePatient(id),
    onSuccess: () => patients.refetch(),
  });

  return (
    <DataTable
      isLoading={patients.isLoading || deletePatientMutation.isPending}
      cols={["ID", "Nome", "CPF", "Telefone", "Sexo", "Nascimento", "Observações"]}
      data={
        patients.data?.map(patient => ({
          id: patient.id,
          ID: patient.id.toString().padStart(4, "0"),
          Nome: patient.nome,
          CPF: patient.cpf,
          Telefone: patient.telefone ?? "",
          Sexo: patient.sexo,
          Nascimento: new Date(patient.nascimento).toLocaleDateString("pt-BR", { timeZone: "UTC" }),
          Observações: patient.observacoes?.split("\n")?.[0] || "-",
        })) ?? []
      }
      customRender={{
        ID: patient => <p className="font-semibold text-text-primary">{patient["ID"]}</p>,
        CPF: patient => patient["CPF"].replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"),
        Telefone: patient =>
          patient["Telefone"].replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3") || "-",
      }}
      actions={patient => (
        <div className="flex gap-2">
          <Link href={`/patients/${patient.id}/update`}>
            <Button variant="secondary">Editar</Button>
          </Link>
          <DestructiveAlert onConfirm={() => deletePatientMutation.mutate(patient.id)}>
            <Button variant="destructive-outline">Excluir</Button>
          </DestructiveAlert>
        </div>
      )}
    />
  );
};
