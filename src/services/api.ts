import axios, { AxiosError } from "axios";
import { getToken } from "./token";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.request.use(
  config => {
    const token = getToken();

    if (token && config) {
      Object.assign(config.headers, { Authorization: `Bearer ${token}` });
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  res => res,
  error => {
    if (error instanceof AxiosError) {
      return Promise.reject(
        error.response?.data ??
          "Algo inesperado aconteceu. Por favor, verifique os dados e tente novamente.",
      );
    }
  },
);

export { api };
