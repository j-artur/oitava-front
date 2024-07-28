"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { FC } from "react";
import { Table } from "~/components/table";
import { getUsers } from "~/services/user";

export const UsersTable: FC = () => {
  const users = useSuspenseQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return (
    users.data && (
      <Table
        data={users.data.map(user => ({
          "id": user.id,
          "Nome": user.nome,
          "ID": user.id.toString().padStart(4, "0"),
          "E-mail": user.email,
        }))}
        render={{
          "Nome": user => user["Nome"],
          "ID": user => <p className="font-semibold text-text-primary">{user["ID"]}</p>,
          "E-mail": user => user["E-mail"],
        }}
      />
    )
  );
};
