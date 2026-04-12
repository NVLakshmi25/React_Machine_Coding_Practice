import React from 'react';

// 🌐 React Router components
import { Navigate, Outlet } from "react-router-dom";

// 🧠 Custom hook to get auth data
import { useAuth } from "../context/AuthContext";


export default function RoleGuard({ allowedRoles }) {

  // 📦 Get user from AuthContext
  const { user } = useAuth();


  // ======================================================
  // ❌ 1. NOT LOGGED IN
  // ======================================================
  // 👉 If no user → redirect to login
  if (!user) return <Navigate to="/login" replace />;


  // ======================================================
  // 🚫 2. ROLE NOT ALLOWED
  // ======================================================
  // 👉 Check if user's role is NOT in allowedRoles
  if (!allowedRoles.includes(user.role)) {

    // ❌ Redirect to unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }


  // ======================================================
  // ✅ 3. ACCESS GRANTED
  // ======================================================
  // 👉 Show protected child routes
  return <Outlet />;
}
--------------------------------------------------------------------------------------------------------------------------------------
  🧠 Simple Explanation
🔐 What is RoleGuard?

👉 It controls access based on user role

Example roles:

"user"
"admin"
⚙️ How it Works
❌ Step 1: Not Logged In
if (!user)

👉 Redirect to login page

🚫 Step 2: Wrong Role
!allowedRoles.includes(user.role)

👉 If role not allowed → block access

✅ Step 3: Allowed
return <Outlet />

👉 Show page

🌐 What is allowedRoles?

👉 Array of roles allowed

Example:

<RoleGuard allowedRoles={["admin"]} />

👉 Only admin can access

🌐 What is <Outlet />?

👉 Shows child routes

🔄 Full Flow
User tries to access admin page
        ↓
Check user exists
        ↓
Check role
        ↓
--------------------------------
| No user → login             |
| Wrong role → unauthorized   |
| Correct role → show page    |
--------------------------------
🧠 Real-Life Example
Office building

You enter admin room
   ↓
Security checks:
   ↓
Are you logged in?
   ↓
Are you admin?
   ↓
----------------------------
| No → go to login         |
| Not admin → access denied|
| Yes → enter room         |
----------------------------
⚡ Important Concepts
✅ 1. Role-Based Access

👉 Different users → different permissions

✅ 2. Authorization vs Authentication
Type	Meaning
Authentication	Who you are (login)
Authorization	What you can access
✅ 3. Nested Routes

👉 <Outlet /> renders child routes

✅ 4. Redirect Control

👉 <Navigate /> handles redirection

⚠️ Small Improvements
❗ Handle missing role safely
if (!user?.role)
❗ Multiple roles
allowedRoles={["admin", "manager"]}
❗ Show message before redirect

👉 Optional UI improvement

🎤 Interview Answer

"RoleGuard is used for role-based authorization. It checks whether the logged-in user's role is included in the allowed roles and conditionally renders protected routes or redirects to an unauthorized page."
