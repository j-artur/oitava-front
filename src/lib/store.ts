import { configureStore, createAction, createReducer } from "@reduxjs/toolkit";
import { User } from "./types";

type AuthSegment = {
  user: User;
  token: string;
};

export const setAuth = createAction<AuthSegment>("auth/set");
export const clearAuth = createAction("auth/clear");

export const initialize = createAction("initialize");

const authReducer = createReducer(null as AuthSegment | null, builder => {
  builder.addCase(setAuth, (_, action) => action.payload);
  builder.addCase(clearAuth, () => null);
});

const initializedReducer = createReducer(false, builder => {
  builder.addCase(initialize, () => true);
});

export const makeStore = () => {
  return configureStore({
    preloadedState: {
      initialized: false,
      auth: null as AuthSegment | null,
    },
    reducer: {
      initialized: initializedReducer,
      auth: authReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
