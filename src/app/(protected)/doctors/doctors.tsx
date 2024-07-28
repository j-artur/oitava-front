"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { FC } from "react";
import { Table } from "~/components/table";
import { Button } from "~/components/ui/button";
import { getDoctors } from "~/services/doctor";

export const DoctorsTable: FC = () => {
  const doctors = useSuspenseQuery({
    queryKey: ["users"],
    queryFn: getDoctors,
  });

  return (
    <Table
      data={doctors.data.map(doctor => ({
        "id": doctor.id,
        "Nome": doctor.nome,
        "ID Médico": doctor.id.toString().padStart(4, "0"),
        "Conselho": doctor.conselho,
        "Nº": `${doctor.conselhoNum}/${doctor.conselhoUf}`,
        "CBO": doctor.cbo ?? "-",
        "CPF": doctor.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"),
      }))}
      render={{
        "Nome": doctor => doctor["Nome"],
        "ID Médico": doctor => (
          <p className="font-semibold text-text-primary">{doctor["ID Médico"]}</p>
        ),
        "Conselho": doctor => doctor["Conselho"],
        "Nº": doctor => doctor["Nº"],
        "CBO": doctor => doctor["CBO"],
        "CPF": doctor => doctor["CPF"],
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
