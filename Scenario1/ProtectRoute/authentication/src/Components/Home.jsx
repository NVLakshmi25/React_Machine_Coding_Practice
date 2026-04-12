import React from "react";

// 🌐 Hook from React Router to navigate between pages
import { useNavigate } from "react-router-dom";

const Home = ({ setIsAuth }) => {

  // 🧭 Function to redirect user to another page
  const navigate = useNavigate();


  // ======================================================
  // 🚪 LOGOUT FUNCTION
  // ======================================================
  const handleLogout = () => {

    // 🧹 Remove login status from localStorage
    localStorage.removeItem("isAuth");

    // 🔄 Update React state → user is now logged out
    setIsAuth(false);

    // 🔁 Redirect user to login page
    navigate("/login");
  };


  return (
    <div>

      {/* 🏠 Home Page Title */}
      <h1 className="text-lg font-bold text-center mb-5 mt-5">
        THIS IS Home Page
      </h1>

      {/* 🚪 Logout Button */}
      <button
        onClick={handleLogout} // 👈 runs logout function
        className="bg-red-600 text-white px-4 py-2 rounded-lg"
      >
        Logout
      </button>

    </div>
  );
};
-------------------------------------------------------------------------------------------------------------------------------------
  🌐 What is useNavigate()?

👉 A React Router hook
👉 Used to change pages programmatically

Example:

navigate("/login");

👉 Goes to login page

🧠 Real-Life Example
You click logout button
   ↓
System clears your session
   ↓
You are redirected to login page
⚡ Important Concepts
✅ 1. State + Storage Sync

👉 Both must be updated:

localStorage
React state
✅ 2. Programmatic Navigation

👉 Navigation without clicking links

✅ 3. Controlled Logout Flow

👉 Clean exit from app

⚠️ Small Improvements
❗ Add confirmation (optional)
if (window.confirm("Are you sure?")) {
  handleLogout();
}
❗ Clear all data
localStorage.clear();

(only if safe)

🎤 Interview Answer

"This component handles logout functionality by clearing authentication data from localStorage, updating the authentication state, and redirecting the user to the login page using React Router."
🔄 Full Flow
User clicks Logout
        ↓
Remove localStorage
        ↓
Update state (isAuth = false)
        ↓
Redirect to /login

export default Home;
