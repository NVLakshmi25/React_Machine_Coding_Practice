import React from "react";

// 📦 Import createContext function from React
import { createContext } from "react";


// 🌐 Create a global context for authentication
export const AuthContext = createContext(null);

/*
🧠 What this line does:

1. createContext(null)
   → Creates a "global container" to share data across components

2. null
   → Default value (when no provider is used)

3. AuthContext
   → This will be used to:
      - Provide data (Provider)
      - Consume data (useContext)

*/
-------------------------------------------------------------------------------------------------------------------
  ⚡ Important Concepts
✅ 1. createContext(null)

👉 null = default value
👉 Used when no provider exists

✅ 2. Context has 2 parts:
Part	Purpose
Provider	Gives data
Consumer	Uses data
✅ 3. No Prop Drilling 🚫

❌ Without Context:

App → Parent → Child → GrandChild

✅ With Context:

Any component can access directly
🎤 Interview Answer

"createContext is used to create a global state container in React, allowing data like authentication details to be shared across components without prop drilling."
