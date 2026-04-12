import React from 'react';

// 🌐 React Router components
import { Navigate, Outlet } from "react-router-dom";

// 🧠 Custom hook to get auth data
import { useAuth } from "../context/AuthContext";


export default function ProtectedRoute() {

  // 📦 Get user and loading state from AuthContext
  const { user, loading } = useAuth();


  // ======================================================
  // ⏳ 1. LOADING STATE
  // ======================================================
  // 👉 While checking if user is logged in
  if (loading) return <p>Loading...</p>;


  // ======================================================
  // ❌ 2. NOT LOGGED IN
  // ======================================================
  // 👉 If no user → redirect to login page
  if (!user) return <Navigate to="/login" replace />;


  // ======================================================
  // ✅ 3. LOGGED IN
  // ======================================================
  // 👉 Show the child routes (protected content)
  return <Outlet />;
}
-------------------------------------------------------------------------------------------------------------------------------------------
  🧠 Simple Explanation
🔐 What is ProtectedRoute?

👉 A gatekeeper for your routes
👉 Only allows logged-in users

⚙️ How it Works
⏳ Step 1: Check Loading
if (loading) return <p>Loading...</p>;

👉 Wait until auth check is complete

❌ Step 2: If NOT Logged In
if (!user) return <Navigate to="/login" />;

👉 Redirect to login page

✅ Step 3: If Logged In
return <Outlet />;

👉 Show protected pages

🌐 What is <Outlet />?

👉 Placeholder for child routes

Example:

<Route element={<ProtectedRoute />}>
  <Route path="/dashboard" element={<Dashboard />} />
</Route>

👉 <Outlet /> renders <Dashboard />

🔄 Full Flow
User visits protected route
        ↓
Check loading
        ↓
----------------------------
| loading → show loading   |
| no user → go to login    |
| user exists → show page  |
----------------------------
🧠 Real-Life Example
You enter a building
   ↓
Security checks your ID
   ↓
If checking → wait
If no ID → go to reception
If valid → enter building
⚡ Important Concepts
✅ 1. Context-based Auth

👉 Uses useAuth() instead of props

✅ 2. Route Protection

👉 Blocks unauthorized users

✅ 3. Nested Routes

👉 <Outlet /> renders child routes

✅ 4. Redirect

👉 <Navigate /> changes route

⚠️ Small Improvements
❗ Better loading UI
return <div className="spinner">Loading...</div>;
❗ Redirect back after login (advanced)
<Navigate to="/login" state={{ from: location }} />
🎤 Interview Answer

"This ProtectedRoute component uses React Context to check authentication state. It conditionally renders child routes using Outlet if the user is logged in, shows a loading state while checking, and redirects unauthorized users using Navigate."
