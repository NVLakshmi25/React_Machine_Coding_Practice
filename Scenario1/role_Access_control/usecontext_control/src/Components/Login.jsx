import React from 'react'

import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (role) => {
    await login(role);  // only update state
  };
  

  // redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate(
        user.role === "admin"
          ? "/dashboard/admin"
          : "/dashboard/user"
      );
    }
  }, [user, navigate]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-3xl font-bold mb-8">Login</h2>

      <div className="flex gap-6">
        <button
          className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
          onClick={() => handleLogin("admin")}
        >
          Login as Admin
        </button>

        <button
          className="px-6 py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
          onClick={() => handleLogin("user")}
        >
          Login as User
        </button>
      </div>
    </div>
  );
}
