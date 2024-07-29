"use client";

import Image from "next/image";
import { useEffect } from "react";
import { ActivityIndicator } from "~/components/activity-indicator";
import { useAppDispatch } from "~/lib/hooks";
import { clearAuth } from "~/lib/store";
import { clearToken } from "~/services/token";

export default function Signout() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(clearAuth());
      clearToken();
    }, 2000);
  }, [dispatch]);

  return (
    <main className="flex flex-1 flex-col p-8">
      <div className="flex flex-1 flex-col items-center justify-center gap-2">
        <Image src="/logo-image.png" width={120} height={120} alt="Oitava Rosado" />
        <h1 className="text-3xl text-text-primary">Te vejo em breve</h1>
        <p className="text-lg text-text-tertiary">
          Esperamos que tenha tido uma ótima experiência!
        </p>
        <ActivityIndicator />
      </div>
    </main>
  );
}
