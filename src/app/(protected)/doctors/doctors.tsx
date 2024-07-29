"use client";

import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { DataTable } from "~/components/data-table";
import { Button } from "~/components/ui/button";
import { getDoctors } from "~/services/doctor";

export const DoctorsTable: FC = () => {
  const doctors = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });

  return (
    <DataTable
      cols={["ID", "Nome", "Conselho", "Nº", "CBO", "CPF"]}
      data={
        doctors.data?.map(doctor => ({
          id: doctor.id,
          ID: doctor.id.toString().padStart(4, "0"),
          Nome: doctor.nome,
          Conselho: doctor.conselho,
          Nº: `${doctor.conselhoNum}/${doctor.conselhoUf}`,
          CBO: doctor.cbo ?? "-",
          CPF: doctor.cpf,
        })) ?? []
      }
      customRender={{
        ID: doctor => <p className="font-semibold text-text-primary">{doctor["ID"]}</p>,
        CPF: doctor => doctor["CPF"].replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"),
      }}
      actions={doctor => (
        <div className="flex gap-2">
          <Button variant="secondary">Editar</Button>
          <Button variant="destructive">Excluir</Button>
        </div>
      )}
    />
  );
};
