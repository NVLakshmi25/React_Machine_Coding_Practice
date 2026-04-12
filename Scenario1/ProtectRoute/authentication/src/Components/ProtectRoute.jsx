import React from "react";

// 🌐 Used to redirect user to another route
import { Navigate } from "react-router-dom";


// 🔐 ProtectRoute component
const ProtectRoute = ({ isAuth, children }) => {

  // ⏳ If auth state is still loading (undefined)
  // 👉 don't render anything yet
  if (isAuth === undefined) return null;


  // ✅ If user is logged in → show protected content
  // ❌ If not logged in → redirect to login page
  return isAuth 
    ? children   // 👈 show Home (or protected page)
    : <Navigate to="/login" replace />; // 👈 redirect
};

export default ProtectRoute;
-----------------------------------------------------------------------------------------------------------------------------------------
  🔄 Full Flow
User tries to access Home (/)
        ↓
ProtectRoute checks isAuth
        ↓
--------------------------------
| true  → show Home           |
| false → redirect to Login   |
| undefined → wait/loading    |
--------------------------------
🧠 Real-Life Example
You try to enter office
   ↓
Security checks ID
   ↓
If valid → enter
If not → go to reception (login page)
🌐 What is <Navigate />?

👉 React Router component
👉 Used to redirect

Example:

<Navigate to="/login" />

👉 Goes to login page

🔁 What is replace?
<Navigate to="/login" replace />

👉 Prevents going back to protected page using browser back button

⚡ Important Concepts
✅ 1. Protected Routes

👉 Restrict access to pages

✅ 2. Conditional Rendering

👉 Show UI based on isAuth

✅ 3. Navigation Control

👉 Redirect unauthorized users

⚠️ Small Improvements
❗ Show loading UI

Instead of null:

if (isAuth === undefined) return <p>Loading...</p>;
❗ Add role-based auth (advanced)
if (user.role !== "admin")
🎤 Interview Answer

"ProtectRoute is a wrapper component that restricts access to routes based on authentication. It conditionally renders protected content or redirects unauthorized users using React Router's Navigate component."
