"use client";

import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { DataTable } from "~/components/data-table";
import { getUsers } from "~/services/user";

export const UsersTable: FC = () => {
  const users = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return (
    <DataTable
      isLoading={users.isLoading}
      cols={["ID", "Nome", "E-mail"]}
      data={
        users.data?.map(user => ({
          "id": user.id,
          "ID": user.id.toString().padStart(4, "0"),
          "Nome": user.nome,
          "E-mail": user.email,
        })) ?? []
      }
      customRender={{
        ID: user => <p className="font-semibold text-text-primary">{user["ID"]}</p>,
      }}
    />
  );
};
