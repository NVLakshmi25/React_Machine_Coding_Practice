import React from "react";

// 🌐 Hook from React Router to navigate between pages
import { useNavigate } from "react-router-dom";

const Login = ({ setIsAuth }) => {

  // 🧭 Used to redirect user to another page
  const navigate = useNavigate();


  // ======================================================
  // 🔐 LOGIN FUNCTION
  // ======================================================
  const handleLogin = () => {

    // 💾 Save login status in localStorage
    // This helps to keep user logged in even after refresh
    localStorage.setItem("isAuth", "true");

    // 🔄 Update React state → user is now logged in
    setIsAuth(true);

    // 🔁 Redirect user to Home page
    navigate("/");
  };


  return (
    <div className="flex flex-col items-center mt-10">

      {/* 🔘 Login Button */}
      <button
        onClick={handleLogin} // 👈 runs login function
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Login
      </button>

    </div>
  );
};
-------------------------------------------------------------------------------------------------------------------------------
  🔄 Full Flow
User clicks Login
        ↓
Save isAuth in localStorage
        ↓
Update state (isAuth = true)
        ↓
Redirect to Home page (/)
🌐 What is useNavigate()?

👉 A React Router hook
👉 Used to change pages

Example:

navigate("/");

👉 Go to Home page

🧠 Real-Life Example
You click login
   ↓
System saves your session
   ↓
You are taken to dashboard
⚡ Important Concepts
✅ 1. Authentication State

👉 isAuth = true → logged in
👉 isAuth = false → logged out

✅ 2. localStorage

👉 Keeps login after refresh

✅ 3. Navigation

👉 Redirect user after login

⚠️ Small Improvements
❗ Add real login form

Instead of just button:

<input placeholder="Email" />
<input placeholder="Password" />
❗ Add validation

Check:

email format
password length
❗ Use real API
await axios.post("/login", data);
🎤 Interview Answer

"This component handles login by storing authentication status in localStorage, updating React state, and redirecting the user to the home page using React Router."

export default Login;
