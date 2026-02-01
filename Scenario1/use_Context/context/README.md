Brief Summary

Demonstrates React Context API for global state sharing

Shares user data without prop drilling

Uses useContext to consume data in a child component

Updates context value and re-renders consumers automatically

🧠 Concept Explanation (Simple)
🔹 createContext

Creates a global container (UserContext)

Holds shared data like user info, theme, auth, etc.

🔹 Context.Provider

Wraps components that need access to shared data

value={user} makes user data available to all children

🔹 useContext

Reads the nearest Provider’s value

Avoids passing props through multiple levels

🔹 Optional Chaining
user?.name ?? "Guest"


Prevents errors if user is null

Shows "Guest" as fallback

🎯 One-Line Interview Answer

This example uses the Context API to share user data globally and update it without prop drilling.

🚀 Why This Is React 19+ Ready

Automatic JSX runtime (no React default import)

Functional components + hooks

Safe for concurrent rendering

Clean, scalable state sharing

💡 When to Use Context

✔ Authentication data
✔ Theme / language settings
✔ User profile info
❌ Avoid for high-frequency updates (use Redux/Zustand instead)