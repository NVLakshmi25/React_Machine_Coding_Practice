import React from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { AuthProvider } from "./context/AuthContext";

import ProtectedRoute from "./routes/ProtectedRoute";
import RoleGuard from "./routes/RoleGuard";

import Login from "./Components/Login";
import Unauthorized from "./Components/Unauthorized";
import DashboardLayout from "./Components/DashboardLayout";

const AdminPanel = lazy(() => import("./Components/AdminPanel"));
const UserPanel = lazy(() => import("./Components/UserPanel"));

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<p>Loading module...</p>}>
          <Routes>

            {/* 👇 ROOT */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route path="/login" element={<Login />} />

            {/* 🔐 AUTH REQUIRED */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardLayout />}>

                {/* default dashboard */}
                <Route
                  index
                  element={<Navigate to="user" replace />}
                />

                {/* USER */}
                <Route path="user" element={<UserPanel />} />

                {/* ADMIN */}
                <Route element={<RoleGuard allowedRoles={["admin"]} />}>
                  <Route path="admin" element={<AdminPanel />} />
                </Route>

              </Route>
            </Route>

            <Route path="/unauthorized" element={<Unauthorized />} />

          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}


// ✅ Two components:

// AdminPanel

// UserPanel
   



