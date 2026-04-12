import { useContext } from "react"; 
// 🧠 React hook to access context data

import { AuthContext } from "./AuthContext"; 
// 🌐 Import the AuthContext you created earlier


// 👇 Custom hook
export const useAuth = () => 
  useContext(AuthContext);

/*
🧠 What this does:

1. useContext(AuthContext)
   → Reads data from AuthContext

2. useAuth()
   → A shortcut (custom hook) to access AuthContext easily

Instead of writing:
   const data = useContext(AuthContext);

You can write:
   const data = useAuth();

*/

-----------------------------------------------------------------------------------------------------------------------------------------
  🔄 Flow
AuthProvider → provides data
        ↓
AuthContext
        ↓
useAuth() reads it
        ↓
Component uses it
🧠 Real-Life Analogy
Context = Water Tank
Provider = fills water
useAuth() = tap
Component = drinks water
⚡ Important Concepts
✅ 1. Custom Hook

👉 A function that uses React hooks

✅ 2. useContext

👉 Reads global data

✅ 3. Cleaner Code

👉 Avoid repeating imports

🎤 Interview Answer

"useAuth is a custom hook that wraps useContext to simplify accessing authentication data from AuthContext, improving code readability and reusability."
