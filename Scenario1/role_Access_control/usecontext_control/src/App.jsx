import React from 'react';
import './App.css';

// 🌐 React Router imports
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// ⚡ Lazy loading (load components only when needed)
import { Suspense, lazy } from "react";

// 🌐 Auth provider (global authentication)
import { AuthProvider } from "./context/AuthContext";

// 🔐 Route protection components
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleGuard from "./routes/RoleGuard";

// 📄 Normal components
import Login from "./Components/Login";
import Unauthorized from "./Components/Unauthorized";
import DashboardLayout from "./Components/DashboardLayout";

// ⚡ Lazy loaded components (code splitting)
const AdminPanel = lazy(() => import("./Components/AdminPanel"));
const UserPanel = lazy(() => import("./Components/UserPanel"));


export default function App() {
  return (

    // 🌐 Enables routing
    <BrowserRouter>

      {/* 🌐 Provides auth data to entire app */}
      <AuthProvider>

        {/* ⏳ Shows fallback while lazy components load */}
        <Suspense fallback={<p>Loading module...</p>}>

          <Routes>

            {/* ======================================================
                👇 ROOT ROUTE
                ====================================================== */}
            <Route 
              path="/" 
              element={<Navigate to="/login" replace />} 
            />
            {/* 👉 Redirects "/" → "/login" */}


            {/* ======================================================
                🔐 LOGIN PAGE (PUBLIC)
                ====================================================== */}
            <Route path="/login" element={<Login />} />


            {/* ======================================================
                🔐 PROTECTED ROUTES (LOGIN REQUIRED)
                ====================================================== */}
            <Route element={<ProtectedRoute />}>

              {/* 🧱 DASHBOARD LAYOUT */}
              <Route 
                path="/dashboard" 
                element={<DashboardLayout />}
              >

                {/* 👉 Default route → redirect to /dashboard/user */}
                <Route
                  index
                  element={<Navigate to="user" replace />}
                />


                {/* ======================================================
                    👤 USER PANEL
                    ====================================================== */}
                <Route 
                  path="user" 
                  element={<UserPanel />} 
                />


                {/* ======================================================
                    👑 ADMIN PANEL (ROLE BASED)
                    ====================================================== */}
                <Route element={
                  <RoleGuard allowedRoles={["admin"]} />
                }>

                  <Route 
                    path="admin" 
                    element={<AdminPanel />} 
                  />

                </Route>

              </Route>

            </Route>


            {/* ======================================================
                🚫 UNAUTHORIZED PAGE
                ====================================================== */}
            <Route 
              path="/unauthorized" 
              element={<Unauthorized />} 
            />

          </Routes>

        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}
------------------------------------------------------------------------------------------------------------------------------------------
 🌐 1. BrowserRouter

👉 Enables routing in your app

🔐 2. AuthProvider

👉 Gives authentication data to all components

⚡ 3. Lazy Loading
const AdminPanel = lazy(() => import(...));

👉 Loads component only when needed

⏳ 4. Suspense
<Suspense fallback={<p>Loading...</p>}>

👉 Shows loading text while component loads

🔐 Authentication Flow
ProtectedRoute
<Route element={<ProtectedRoute />}>

👉 Only logged-in users can access

RoleGuard
<RoleGuard allowedRoles={["admin"]} />

👉 Only admin users can access

🧱 Dashboard Structure
URL Structure
/dashboard
   ├── /user
   └── /admin
Default Route
index → Navigate to "user"

👉 /dashboard → /dashboard/user

🔄 Full Flow
User opens app
   ↓
"/" → redirected to "/login"
   ↓
User logs in
   ↓
Access "/dashboard"
   ↓
-------------------------------
| /dashboard/user → allowed   |
| /dashboard/admin → admin only |
-------------------------------
   ↓
If not admin → unauthorized
🧠 Real-Life Example
Office Building

Login → Enter building
Dashboard → Main area

User Room → Everyone allowed
Admin Room → Only managers allowed

Unauthorized → Access denied room
⚡ Important Concepts
✅ 1. Nested Routing
<Route path="/dashboard">

👉 Child routes inside parent

✅ 2. Redirecting
<Navigate to="/login" />

👉 Automatically change route

✅ 3. Role-Based Access

👉 Restrict based on user role

✅ 4. Code Splitting

👉 Improves performance

🎤 Interview Answer

"This app implements advanced routing using React Router with authentication and role-based access control. ProtectedRoute ensures only authenticated users can access routes, while RoleGuard restricts access based on roles. Lazy loading is used to optimize performance by loading components on demand." 
