import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function DashboardLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 🔵 NAVBAR */}
      <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-indigo-600">
          Dashboard
        </h1>

        <div className="flex items-center gap-6">
          <Link
            to="/dashboard/user"
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            User
          </Link>

          <Link
            to="/dashboard/admin"
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            Admin
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* 🧱 PAGE CONTENT */}
      <main className="p-6 max-w-6xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
