import React, { useState, useEffect } from "react";

// 🌐 React Router imports
import { BrowserRouter, Route, Routes } from "react-router-dom";

// 🔐 Custom protected route component
import ProtectRoute from "./Components/ProtectRoute";

// 🏠 Pages
import Home from "./Components/Home";
import Login from "./Components/Login";

function App() {

  // 🔐 State to track if user is logged in
  const [isAuth, setIsAuth] = useState(false);


  // ======================================================
  // 🔄 LOAD AUTH FROM LOCAL STORAGE (AFTER REFRESH)
  // ======================================================
  useEffect(() => {

    // 📥 Get saved login status
    const savedAuth = localStorage.getItem("isAuth");

    // ✅ If user was logged in → restore state
    if (savedAuth === "true") {
      setIsAuth(true);
    }

  }, []); // runs only once when app loads


  return (

    // 🌐 Wrap entire app with router
    <BrowserRouter>

      <Routes>

        {/* ================= HOME (PROTECTED) ================= */}
        <Route
          path="/"
          element={
            // 🔐 Protect this route
            <ProtectRoute isAuth={isAuth}>

              {/* 👇 Show Home only if logged in */}
              <Home setIsAuth={setIsAuth} />

            </ProtectRoute>
          }
        />


        {/* ================= LOGIN ================= */}
        <Route
          path="/login"
          element={
            // 👇 Login page (public)
            <Login setIsAuth={setIsAuth} />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
---------------------------------------------------------------------------------------------------------------------------------------------
  🔄 Full Flow
App loads
   ↓
Check localStorage
   ↓
-------------------------
| Logged in → Home      |
| Not logged → Login    |
-------------------------
   ↓
User logs in
   ↓
setIsAuth(true)
   ↓
Save in localStorage
   ↓
Access Home page
🧠 Real-Life Example
You open website
   ↓
System checks login
   ↓
If not logged → go to Login page
If logged → go to Dashboard
⚡ Important Concepts
✅ 1. Protected Routes

👉 Restrict access to certain pages

✅ 2. React Router

👉 Handles navigation without reload

✅ 3. State Persistence

👉 localStorage keeps login after refresh

⚠️ Small Improvements
❗ Save auth on login

In Login component:

localStorage.setItem("isAuth", "true");
setIsAuth(true);
❗ Clear on logout
localStorage.removeItem("isAuth");
setIsAuth(false);
🎤 Interview Answer

"This app uses React Router to implement protected routes. Authentication state is stored in localStorage and restored on refresh, ensuring users remain logged in. The ProtectRoute component restricts access to authenticated users only."
