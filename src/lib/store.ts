import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";
import { User } from "./types";

type AuthSegment = {
  user: User;
  token: string;
};

export const setAuth = createAction<AuthSegment>("auth/set");
export const clearAuth = createAction("auth/clear");

const authReducer = createReducer(null as AuthSegment | null, builder => {
  builder.addCase(setAuth, (_, action) => action.payload);
  builder.addCase(clearAuth, () => null);
});

export const makeStore = () => {
  return configureStore({
    preloadedState: {
      auth: null as AuthSegment | null,
    },
    reducer: {
      auth: authReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
