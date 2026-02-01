import React from "react";
import { useAuth } from "./Components/useAuth";

export default function App() {
  const { accessToken } = useAuth();

  if (accessToken === undefined) {
    return <p>Loading...</p>;
  }

  if (accessToken === null) {
    return <p>Please Login</p>;
  }

  return <h1>Dashboard - Authenticated ✅</h1>;
}
