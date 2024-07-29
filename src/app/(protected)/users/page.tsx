import { Suspense } from "react";
import Breadcrumbs from "~/components/breadcrumbs";
import { UsersTable } from "./users";

export default function Users() {
  return (
    <main className="flex flex-1 flex-col">
      <div className="fixed top-0 -z-10 h-1/3 w-full bg-primary-dark" />
      <div className="fixed top-1/3 -z-10 h-2/3 w-full bg-bg-white" />
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex w-full max-w-full shrink flex-col items-center gap-2">
          <div className="flex w-full flex-col bg-primary-dark pb-2 lg:items-center">
            <div className="flex w-full flex-col px-4 pt-4 lg:w-4/5 lg:px-0">
              <div className="flex flex-col py-4 lg:py-6">
                <Breadcrumbs path={[{ route: "/users", label: "Usuários" }]} />
              </div>
              <div className="flex flex-row flex-wrap items-center justify-between gap-2">
                <div className="flex flex-col">
                  <h1 className="text-3xl font-bold text-white">Usuários</h1>
                  <p className="font-medium text-white/90">
                    Gerencie com eficiência e segurança os usuários do sistema.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-4/5">
            <Suspense>
              <UsersTable />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
