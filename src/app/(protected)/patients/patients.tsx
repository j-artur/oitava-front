"use client";

import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { DataTable } from "~/components/data-table";
import { Button } from "~/components/ui/button";
import { Sex } from "~/lib/types";
import { getPatients } from "~/services/patient";

export const PatientsTable: FC = () => {
  const patients = useQuery({
    queryKey: ["patients"],
    queryFn: getPatients,
  });

  return (
    <DataTable
      cols={["ID", "Nome", "CPF", "Telefone", "Sexo", "Nascimento", "Observações"]}
      data={
        patients.data?.map(patient => ({
          id: patient.id,
          ID: patient.id.toString().padStart(4, "0"),
          Nome: patient.nome,
          CPF: patient.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"),
          Telefone: patient.telefone?.replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3") ?? "-",
          Sexo: patient.sex === Sex.MALE ? "Masculino" : "Feminino",
          Nascimento: new Date(patient.birthdate).toLocaleDateString("pt-BR"),
          Observações: patient.observacoes ?? "-",
        })) ?? []
      }
      customRender={{
        ID: patient => <p className="font-semibold text-text-primary">{patient["ID"]}</p>,
      }}
      actions={patient => (
        <div className="flex gap-2">
          <Button variant="secondary">Editar</Button>
          <Button variant="destructive">Excluir</Button>
        </div>
      )}
    />
  );
};
