import React from 'react'
// An AuthContext that stores the logged-in user
import { createContext, useContext, useEffect, useState } from "react";
import { loginApi } from '../API/authApi';


const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("auth");

    if (saved) {
      const parsed = JSON.parse(saved);
      setUser(parsed.user);
      setToken(parsed.token);
    }

    setLoading(false);
  }, []);

  const login = async (role) => {
    const res = await loginApi(role);

    setUser(res.user);
    setToken(res.token);

    localStorage.setItem("auth", JSON.stringify(res));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
