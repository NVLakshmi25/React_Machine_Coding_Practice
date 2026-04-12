import React from 'react';

// 🌐 Import React hooks
import { createContext, useContext, useEffect, useState } from "react";

// 🔗 API function for login
import { loginApi } from '../API/authApi';


// ======================================================
// 🌐 CREATE CONTEXT (global auth storage)
// ======================================================
const AuthContext = createContext(null);


// ======================================================
// 🌐 AUTH PROVIDER (wraps entire app)
// ======================================================
export function AuthProvider({ children }) {

  // 👤 Store logged-in user info
  const [user, setUser] = useState(null);

  // 🔐 Store authentication token
  const [token, setToken] = useState(null);

  // ⏳ Loading state (used while checking login)
  const [loading, setLoading] = useState(true);


  // ======================================================
  // 🔄 RESTORE LOGIN AFTER REFRESH
  // ======================================================
  useEffect(() => {

    // 📥 Get saved auth data from localStorage
    const saved = localStorage.getItem("auth");

    if (saved) {
      // 🔄 Convert string → object
      const parsed = JSON.parse(saved);

      // ✅ Restore user & token
      setUser(parsed.user);
      setToken(parsed.token);
    }

    // ⏳ Done loading
    setLoading(false);

  }, []); // runs once on app load


  // ======================================================
  // 🔐 LOGIN FUNCTION
  // ======================================================
  const login = async (role) => {

    // 🌐 Call API (fake or real backend)
    const res = await loginApi(role);

    // ✅ Save user and token
    setUser(res.user);
    setToken(res.token);

    // 💾 Save in localStorage (persist login)
    localStorage.setItem("auth", JSON.stringify(res));
  };


  // ======================================================
  // 🚪 LOGOUT FUNCTION
  // ======================================================
  const logout = () => {

    // 🧹 Clear state
    setUser(null);
    setToken(null);

    // 🧹 Remove from localStorage
    localStorage.removeItem("auth");
  };


  // ======================================================
  // 🌐 PROVIDE DATA TO ALL COMPONENTS
  // ======================================================
  return (
    <AuthContext.Provider
      value={{
        user,     // 👤 user info
        token,    // 🔐 auth token
        login,    // 🔐 login function
        logout,   // 🚪 logout function
        loading   // ⏳ loading state
      }}
    >
      {children} {/* 👈 your entire app */}
    </AuthContext.Provider>
  );
}


// ======================================================
// 🧠 CUSTOM HOOK (easy access to auth)
// ======================================================
export function useAuth() {

  // 👉 Access AuthContext data
  return useContext(AuthContext);
}
------------------------------------------------------------------------------------------------------------------------------------------
 🧠 Simple Explanation
🌐 What this code does

👉 Manages authentication for entire app
👉 Stores:

user 👤
token 🔐
login/logout functions
🔄 Full Flow
App starts
   ↓
Check localStorage
   ↓
-------------------------
| Found → restore login |
| Not found → logged out|
-------------------------
   ↓
User logs in
   ↓
Call API → get token
   ↓
Save in state + localStorage
   ↓
User logs out
   ↓
Clear everything
⚙️ Key Parts Explained
🌐 1. createContext
const AuthContext = createContext(null);

👉 Creates global storage

⏳ 2. useEffect (restore login)
localStorage.getItem("auth")

👉 Keeps user logged in after refresh

🔐 3. login()
const res = await loginApi(role);

👉 Calls backend
👉 Saves user + token

🚪 4. logout()
localStorage.removeItem("auth");

👉 Clears login

🧠 5. useAuth()
const { user } = useAuth();

👉 Easy way to access auth data

🧠 Real-Life Example
You open app
   ↓
System checks saved login
   ↓
If found → auto login
   ↓
If not → ask login
⚡ Important Concepts
✅ 1. Context API

👉 Share data globally

✅ 2. Persistence

👉 localStorage keeps login

✅ 3. Custom Hook

👉 Cleaner access

✅ 4. Async Login

👉 API call

⚠️ Small Improvements
❗ Add error handling
try {
  const res = await loginApi(role);
} catch (err) {
  console.log(err);
}
❗ Token expiration handling

👉 Add refresh token logic (like previous example)

❗ Secure storage

👉 Avoid storing sensitive tokens in localStorage (advanced)

🎤 Interview Answer

"This implementation uses React Context API to manage authentication globally. It stores user and token in state, persists them in localStorage, and provides login/logout functionality via a custom hook." 
