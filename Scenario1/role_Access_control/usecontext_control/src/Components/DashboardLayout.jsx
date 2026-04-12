import React from "react";

// 🌐 React Router tools
import { Outlet, Link, useNavigate } from "react-router-dom";

// 🧠 Custom auth hook
import { useAuth } from "../context/AuthContext";


export default function DashboardLayout() {

  // 🔐 Get logout function from context
  const { logout } = useAuth();

  // 🧭 Used to navigate programmatically
  const navigate = useNavigate();


  // ======================================================
  // 🚪 LOGOUT FUNCTION
  // ======================================================
  const handleLogout = () => {

    // 🧹 Clear user data (context + localStorage)
    logout();

    // 🔁 Redirect to login page
    navigate("/login");
  };


  return (

    // 🌐 Main container (full page)
    <div className="min-h-screen bg-gray-100">

      {/* ======================================================
          🔵 NAVBAR (Top Menu)
          ====================================================== */}
      <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">

        {/* 🏷️ Title */}
        <h1 className="text-xl font-bold text-indigo-600">
          Dashboard
        </h1>


        {/* 🔗 Navigation Links */}
        <div className="flex items-center gap-6">

          {/* 👤 User Page Link */}
          <Link
            to="/dashboard/user"
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            User
          </Link>

          {/* 👑 Admin Page Link */}
          <Link
            to="/dashboard/admin"
            className="text-gray-700 hover:text-indigo-600 font-medium"
          >
            Admin
          </Link>

          {/* 🚪 Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>

        </div>
      </nav>


      {/* ======================================================
          🧱 PAGE CONTENT AREA
          ====================================================== */}
      <main className="p-6 max-w-6xl mx-auto">

        {/* 👇 This is where child routes will render */}
        <Outlet />

      </main>

    </div>
  );
}
---------------------------------------------------------------------------------------------------------------------------------------
🎯 What this component does

👉 Creates a layout (structure) for dashboard
👉 Contains:

Navbar (top menu)
Page content area
🌐 What is <Outlet />?

👉 Placeholder for child pages

Example:

<Route path="/dashboard" element={<DashboardLayout />}>
  <Route path="user" element={<UserPanel />} />
</Route>

👉 <Outlet /> will show UserPanel

🔄 How Navigation Works
🔗 Link
<Link to="/dashboard/user">

👉 Click → goes to User page

🧭 useNavigate
navigate("/login");

👉 Used in logout to redirect

🔐 Logout Flow
Click Logout
     ↓
logout() clears data
     ↓
navigate("/login")
     ↓
User goes to login page
🧠 Real-Life Example
Dashboard = Office building

Navbar = Menu bar
   ↓
User clicks "User" → goes to user room
User clicks "Admin" → goes to admin room
Logout → exits building
⚡ Important Concepts
✅ 1. Layout Component

👉 Reusable structure for multiple pages

✅ 2. Nested Routing

👉 Parent route + child routes

✅ 3. Outlet

👉 Displays child components

✅ 4. Navigation

👉 Link (click) + Navigate (code)

⚠️ Small Improvements
❗ Hide admin link for non-admin
{user?.role === "admin" && <Link to="/dashboard/admin">Admin</Link>}
❗ Show username
<p>Welcome {user.name}</p>
❗ Add active link style

👉 Highlight current page

🎤 Interview Answer

"DashboardLayout is a layout component that provides a shared structure for dashboard pages. It includes navigation links, logout functionality, and uses React Router's Outlet to render nested routes dynamically."  
