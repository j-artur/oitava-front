"use client";

import { useRouter } from "next/navigation";
import { FC, ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import { clearAuth, initialize, setAuth } from "~/lib/store";
import { me } from "~/services/auth";
import { clearToken, getToken } from "~/services/token";

export const AuthGuard: FC<{ children: ReactNode }> = ({ children }) => {
  const isInitialized = useAppSelector(store => store.initialized);

  const dispatch = useAppDispatch();

  const token = getToken();

  useEffect(() => {
    async function populateStore() {
      try {
        const user = await me();

        if (token && user) {
          dispatch(setAuth({ token, user }));
        }

        dispatch(initialize());
      } catch (e) {
        dispatch(clearAuth());
        clearToken();
        dispatch(initialize());
      }
    }

    if (!isInitialized) {
      populateStore();
    }
  }, [token, isInitialized, dispatch]);

  const router = useRouter();

  useEffect(() => {
    if ("window" in globalThis && !token) {
      router.push("/signin");
    }
  }, [token, router]);

  return <>{children}</>;
};
