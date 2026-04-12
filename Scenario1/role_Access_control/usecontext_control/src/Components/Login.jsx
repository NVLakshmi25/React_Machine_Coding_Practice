import React from 'react';

// ⏳ Hook to run side effects
import { useEffect } from "react";

// 🧠 Custom auth hook (from context)
import { useAuth } from "../context/AuthContext";

// 🌐 Navigation hook
import { useNavigate } from "react-router-dom";


export default function Login() {

  // 📦 Get login function + user from context
  const { login, user } = useAuth();

  // 🧭 Used to redirect user
  const navigate = useNavigate();


  // ======================================================
  // 🔐 LOGIN FUNCTION
  // ======================================================
  const handleLogin = async (role) => {

    // 🌐 Call login function (API call inside)
    await login(role);  
    // 👉 only updates state (user + token)
  };


  // ======================================================
  // 🔄 REDIRECT AFTER LOGIN
  // ======================================================
  useEffect(() => {

    // 👉 If user is logged in
    if (user) {

      // 🔁 Redirect based on role
      navigate(
        user.role === "admin"
          ? "/dashboard/admin" // 👑 admin goes here
          : "/dashboard/user"  // 👤 normal user goes here
      );
    }

  }, [user, navigate]); // runs when user changes


  return (

    // 🌐 Centered login page
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

      {/* 🏷️ Title */}
      <h2 className="text-3xl font-bold mb-8">
        Login
      </h2>


      {/* 🔘 LOGIN BUTTONS */}
      <div className="flex gap-6">

        {/* 👑 Admin Login */}
        <button
          className="px-6 py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"

          // 👉 login as admin
          onClick={() => handleLogin("admin")}
        >
          Login as Admin
        </button>


        {/* 👤 User Login */}
        <button
          className="px-6 py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700"

          // 👉 login as user
          onClick={() => handleLogin("user")}
        >
          Login as User
        </button>

      </div>
    </div>
  );
}
--------------------------------------------------------------------------------------------------------------------------------------
🧠 Simple Explanation
🔐 What this component does

👉 Allows login as:

👑 Admin
👤 User

👉 Redirects based on role

⚙️ How it Works
1️⃣ User clicks button
handleLogin("admin")

👉 Calls login function

2️⃣ login() updates state
user = { name: "John", role: "admin" }
3️⃣ useEffect runs
if (user)

👉 Detects login

4️⃣ Redirect based on role
admin → /dashboard/admin
user  → /dashboard/user
🔄 Full Flow
User clicks login button
        ↓
login(role) called
        ↓
user state updated
        ↓
useEffect runs
        ↓
------------------------------
| admin → admin dashboard    |
| user  → user dashboard     |
------------------------------
🧠 Real-Life Example
You log into system
   ↓
System checks your role
   ↓
-------------------------
| Admin → Admin Panel   |
| User  → User Panel    |
-------------------------
⚡ Important Concepts
✅ 1. Role-Based Login

👉 Different users → different pages

✅ 2. useEffect for Redirect

👉 Runs when user changes

✅ 3. Conditional Navigation
user.role === "admin"
✅ 4. Async Function

👉 await login(role)

⚠️ Small Improvements
❗ Add loading state
const [loading, setLoading] = useState(false);
❗ Add error handling
try {
  await login(role);
} catch (err) {
  alert("Login failed");
}
❗ Add real form

👉 Email + password

🎤 Interview Answer

"This component implements role-based login using a context API. It triggers login with a selected role and redirects users to different dashboard routes based on their role using useEffect."
  
