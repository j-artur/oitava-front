"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { FC } from "react";
import { DataTable } from "~/components/data-table";
import { getUsers } from "~/services/user";

export const UsersTable: FC = () => {
  const users = useSuspenseQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return (
    users.data && (
      <DataTable
        cols={["Nome", "ID Usuário", "E-mail"]}
        data={users.data.map(user => ({
          "id": user.id,
          "Nome": user.nome,
          "ID Usuário": user.id.toString().padStart(4, "0"),
          "E-mail": user.email,
        }))}
        customRender={{
          "ID Usuário": user => (
            <p className="font-semibold text-text-primary">{user["ID Usuário"]}</p>
          ),
        }}
      />
    )
  );
};
