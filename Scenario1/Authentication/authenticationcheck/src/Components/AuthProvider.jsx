import React from "react";
import {
  useEffect,        // ⏳ runs after render
  useLayoutEffect,  // ⚡ runs before browser paint (important for interceptors)
  useState,
} from "react";

import api from "../context/api"; // 🌐 axios instance (your API setup)
import { AuthContext } from "./AuthContext"; // 🌐 global context

// 👇 This component wraps your entire app
export function AuthProvider({ children }) {

  // 🔐 Stores access token
  // undefined → loading
  // null → not logged in
  // string → logged in
  const [accessToken, setAccessToken] = useState(undefined);


  // ======================================================
  // ⏳ STEP 1: CHECK SESSION WHEN APP LOADS
  // ======================================================
  useEffect(() => {

    async function fetchMe() {
      try {
        // 🔍 Check if user session exists
        const res = await api.get("/auth/me");

        // ✅ If success → user is logged in
        setAccessToken(res.data.accessToken);

      } catch {
        // ❌ If failed → user not logged in
        setAccessToken(null);
      }
    }

    fetchMe();

  }, []); // runs only once on mount


  // ======================================================
  // 📤 STEP 2: REQUEST INTERCEPTOR
  // ======================================================
  useLayoutEffect(() => {

    // 👉 Runs before every API request
    const interceptor = api.interceptors.request.use(
      (config) => {

        // ✅ If token exists → attach it
        if (accessToken && !config._retry) {
          config.headers.Authorization =
            `Bearer ${accessToken}`;
        }

        return config;
      }
    );

    // 🧹 Cleanup when component unmounts
    return () =>
      api.interceptors.request.eject(interceptor);

  }, [accessToken]); // re-run when token changes


  // ======================================================
  // 📥 STEP 3: RESPONSE INTERCEPTOR
  // ======================================================
  useLayoutEffect(() => {

    const interceptor = api.interceptors.response.use(

      // ✅ If response is OK → return it
      (res) => res,

      // ❌ If error happens
      async (error) => {

        const originalRequest = error.config;

        // 🔐 Check if token expired / unauthorized
        if (
          error.response?.status === 403 &&
          error.response.data?.message === "unauthorized" &&
          !originalRequest._retry
        ) {

          // 🔁 Prevent infinite loop
          originalRequest._retry = true;

          try {
            // 🔄 Request new token (refresh token API)
            const res = await api.get("/auth/refresh");

            // ✅ Save new token
            setAccessToken(res.data.accessToken);

            // 🔁 Update failed request with new token
            originalRequest.headers.Authorization =
              `Bearer ${res.data.accessToken}`;

            // 🔁 Retry original request
            return api(originalRequest);

          } catch {

            // ❌ Refresh failed → logout
            setAccessToken(null);
          }
        }

        // ❌ If not handled → reject error
        return Promise.reject(error);
      }
    );

    // 🧹 Cleanup
    return () =>
      api.interceptors.response.eject(interceptor);

  }, []); // runs once


  // ======================================================
  // 🌐 PROVIDE DATA TO APP
  // ======================================================
  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken }}
    >
      {children} {/* 👈 your entire app */}
    </AuthContext.Provider>
  );
}
-----------------------------------------------------------------------------------------------------------------------
  🔄 Full Flow (Very Important ⭐)
App starts
   ↓
Check /auth/me
   ↓
-----------------------------
| Success → logged in       |
| Fail → not logged in      |
-----------------------------
   ↓
User makes API request
   ↓
Token added automatically
   ↓
If token expired:
   ↓
Call /auth/refresh
   ↓
Get new token
   ↓
Retry original request
⚙️ Core Concepts Explained Simply
⏳ 1. useEffect → Check Login
api.get("/auth/me")

👉 Ask backend:
"Is user already logged in?"

📤 2. Request Interceptor

👉 Before every API call:

Authorization: Bearer token

👉 Automatically added

📥 3. Response Interceptor

👉 If token expired:

Call /auth/refresh
Get new token
Retry request
🔁 4. _retry flag
originalRequest._retry = true;

👉 Prevent infinite loop

🧠 Real-Life Example

Think like this:

You go to office (API request)
   ↓
Security asks ID (token)
   ↓
If expired:
   ↓
Go to admin (refresh token)
   ↓
Get new ID
   ↓
Enter office
⚡ Important Notes
❗ 1. Why useLayoutEffect?

👉 Runs before UI updates
👉 Ensures interceptors are ready

❗ 2. Why Context?

👉 So entire app can access:

accessToken
setAccessToken
❗ 3. Why interceptors?

👉 Avoid writing this everywhere:

headers: { Authorization: token }
🎤 Interview Answer

"This component manages authentication using React Context and Axios interceptors. It checks the session on load, attaches access tokens to requests, and automatically refreshes expired tokens while retrying failed requests."
