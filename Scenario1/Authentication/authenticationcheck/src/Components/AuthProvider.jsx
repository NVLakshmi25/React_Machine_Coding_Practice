import React from "react";
import {
  useEffect,
  useLayoutEffect,
  useState,
} from "react";

import api from "../context/api";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(undefined);

  // ---- CHECK SESSION ON LOAD ----
  useEffect(() => {
    async function fetchMe() {
      try {
        const res = await api.get("/auth/me");
        setAccessToken(res.data.accessToken);
      } catch {
        setAccessToken(null);
      }
    }

    fetchMe();
  }, []);

  // ---- REQUEST INTERCEPTOR ----
  useLayoutEffect(() => {
    const interceptor = api.interceptors.request.use(
      (config) => {
        if (accessToken && !config._retry) {
          config.headers.Authorization =
            `Bearer ${accessToken}`;
        }
        return config;
      }
    );

    return () =>
      api.interceptors.request.eject(interceptor);
  }, [accessToken]);

  // ---- RESPONSE INTERCEPTOR ----
  useLayoutEffect(() => {
    const interceptor = api.interceptors.response.use(
      (res) => res,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response?.status === 403 &&
          error.response.data?.message ===
            "unauthorized" &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          try {
            const res = await api.get(
              "/auth/refresh"
            );

            setAccessToken(
              res.data.accessToken
            );

            originalRequest.headers.Authorization =
              `Bearer ${res.data.accessToken}`;

            return api(originalRequest);
          } catch {
            setAccessToken(null);
          }
        }

        return Promise.reject(error);
      }
    );

    return () =>
      api.interceptors.response.eject(
        interceptor
      );
  }, []);

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}