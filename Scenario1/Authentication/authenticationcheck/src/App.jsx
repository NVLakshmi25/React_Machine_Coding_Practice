import React from "react";

// 👇 Custom hook (your own logic for authentication)
import { useAuth } from "./Components/useAuth";

export default function App() {

  // 🧠 Get accessToken from custom hook
  const { accessToken } = useAuth();

  // ⏳ Case 1: Still checking authentication
  // (for example: API call is in progress)
  if (accessToken === undefined) {
    return <p>Loading...</p>;
  }

  // 🔐 Case 2: User is NOT logged in
  // (token is null → no authentication)
  if (accessToken === null) {
    return <p>Please Login</p>;
  }

  // ✅ Case 3: User is logged in
  // (token exists)
  return <h1>Dashboard - Authenticated ✅</h1>;
}
--------------------------------------------------------------------------------------------------------------------------------------
  🔄 Flow Diagram
App starts
   ↓
useAuth() runs
   ↓
Check accessToken
   ↓
--------------------------------
| undefined → Loading...       |
| null      → Please Login     |
| token     → Dashboard        |
--------------------------------
⚡ Important Concepts
✅ 1. Conditional Rendering

👉 Showing UI based on condition

if (...) return ...
✅ 2. Custom Hook

👉 useAuth() = reusable logic

✅ 3. Authentication Flow

👉 Token decides access

🧠 Real-World Example

Think like this:

You open app
   ↓
System checks login
   ↓
If not logged → ask login
If logged → show dashboard
🎤 Interview Answer

"This component uses a custom authentication hook to conditionally render UI based on the user's login state. It shows a loading state, login prompt, or dashboard depending on the access token."
