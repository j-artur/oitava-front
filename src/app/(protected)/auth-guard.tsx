"use client";

import { redirect } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import { initialize, setAuth } from "~/lib/store";
import { me } from "~/services/auth";
import { getToken } from "~/services/token";

export const AuthGuard: FC<{ children: ReactNode }> = ({ children }) => {
  const isInitialized = useAppSelector(store => store.initialized);
  const authSegment = useAppSelector(store => store.auth);

  const dispatch = useAppDispatch();

  const token = getToken();

  useEffect(() => {
    async function populateStore() {
      const user = await me();

      if (token && user) {
        dispatch(setAuth({ token, user }));
      }

      dispatch(initialize());
    }

    if (!isInitialized) {
      populateStore();
    }
  }, [token, isInitialized, dispatch]);

  if ("window" in globalThis && !token) {
    redirect("/signin");
  }

  return <>{children}</>;
};
