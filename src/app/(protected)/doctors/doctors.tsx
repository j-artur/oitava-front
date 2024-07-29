"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { FC } from "react";
import { DataTable } from "~/components/data-table";
import { Button } from "~/components/ui/button";
import { getDoctors } from "~/services/doctor";

export const DoctorsTable: FC = () => {
  const doctors = useSuspenseQuery({
    queryKey: ["users"],
    queryFn: getDoctors,
  });

  return (
    <DataTable
      cols={["Nome", "ID Médico", "Conselho", "Nº", "CBO", "CPF"]}
      data={doctors.data.map(doctor => ({
        "id": doctor.id,
        "Nome": doctor.nome,
        "ID Médico": doctor.id.toString().padStart(4, "0"),
        "Conselho": doctor.conselho,
        "Nº": `${doctor.conselhoNum}/${doctor.conselhoUf}`,
        "CBO": doctor.cbo ?? "-",
        "CPF": doctor.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"),
      }))}
      customRender={{
        "ID Médico": doctor => (
          <p className="font-semibold text-text-primary">{doctor["ID Médico"]}</p>
        ),
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
