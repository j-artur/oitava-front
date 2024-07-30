"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FC } from "react";
import { DataTable } from "~/components/data-table";
import { DestructiveAlert } from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import { deleteDoctor, getDoctors } from "~/services/doctor";

export const DoctorsTable: FC = () => {
  const doctors = useQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });

  const deleteDoctorMutation = useMutation({
    mutationKey: ["deleteDoctor"],
    mutationFn: (id: number) => deleteDoctor(id),
    onSuccess: () => doctors.refetch(),
  });

  return (
    <DataTable
      isLoading={doctors.isLoading || deleteDoctorMutation.isPending}
      cols={["ID", "Nome", "Conselho", "Nº", "CBO", "CPF"]}
      data={
        doctors.data?.map(doctor => ({
          id: doctor.id,
          ID: doctor.id.toString().padStart(4, "0"),
          Nome: doctor.nome,
          Conselho: doctor.conselho,
          Nº: `${doctor.conselhoUf}/${doctor.conselhoNum}`,
          CBO: doctor.cbo || "-",
          CPF: doctor.cpf,
        })) ?? []
      }
      customRender={{
        ID: doctor => <p className="font-semibold text-text-primary">{doctor["ID"]}</p>,
        CPF: doctor => doctor["CPF"].replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"),
      }}
      actions={doctor => (
        <div className="flex gap-2">
          <Link href={`/doctors/${doctor.id}/update`}>
            <Button variant="secondary">Editar</Button>
          </Link>
          <DestructiveAlert onConfirm={() => deleteDoctorMutation.mutate(doctor.id)}>
            <Button variant="destructive-outline">Excluir</Button>
          </DestructiveAlert>
        </div>
      )}
    />
  );
};
