📌 React Context API Example (User Profile)

A simple React project demonstrating Context API for global state management.
This example shares user information across components without prop drilling and updates UI automatically when context state changes.

🚀 Features

✅ Uses React Context API to share global user data
✅ Avoids prop drilling (passing props through multiple components)
✅ Uses useContext Hook to consume context values
✅ Updates context state dynamically using useState
✅ Uses optional chaining + nullish coalescing for safe rendering
✅ Styled using Tailwind CSS
✅ Built with Vite for fast development

🧠 Core Concepts Covered
🔹 React Concepts

createContext()

Context.Provider

useContext()

useState()

Component re-rendering when context value changes

🔹 JavaScript Concepts

Object immutability using spread operator { ...u }

Optional chaining ?.

Nullish coalescing operator ??

Arrow functions

Callback function in state update

🔹 TailwindCSS Concepts

Utility-first CSS styling

Button styling using className utilities

📂 Folder Structure
src/
│── Components/
│   ├── Profile.jsx
│   ├── UserContextExample.jsx
│
│── context/
│   ├── UserContext.js
│
│── App.jsx
│── main.jsx
│── index.css

⚙️ Technologies Used

React 18+

Vite

Tailwind CSS

JavaScript (ES6+)

📌 Project Setup (Installation)
1️⃣ Clone the Repository
git clone <your-repo-url>
cd <your-project-folder>

2️⃣ Install Dependencies
npm install

3️⃣ Start Development Server
npm run dev

▶️ How This Project Works
🔹 Step 1: Create Context

📍 UserContext.js

import { createContext } from "react";
export const UserContext = createContext(null);


✔ Creates a global container for user data
✔ Default value is null

🔹 Step 2: Provide Context Value

📍 UserContextExample.jsx

<UserContext.Provider value={user}>
  <Profile />
</UserContext.Provider>


✔ Makes user available to all child components
✔ Prevents passing props manually

🔹 Step 3: Consume Context in Child Component

📍 Profile.jsx

const usersId = useContext(UserContext);


✔ Reads the user value from nearest provider
✔ Automatically updates UI if context value changes

🔹 Step 4: Update Context Value
onClick={() => setUser((u) => ({ ...u, name: "Jane" }))}


✔ Uses immutable update pattern
✔ React re-renders all context consumers

🎯 Output Behavior
Action	Output
Page loads	Hello, John
Click "Change Name"	Hello, Jane
If user becomes null	Hello, Guest
🛡️ Safe Rendering Logic
Hello, {usersId?.name ?? "Guest"}

Meaning:

usersId?.name → avoids crash if user is null

?? "Guest" → fallback value if name is undefined or null

🧪 Example UI

Shows user greeting text

Button updates user name

UI updates automatically without props

💡 Why Context API is Used?

Context API is useful for sharing global values like:

Authentication details

Logged-in user profile

Theme (Dark/Light mode)

Language preferences

App settings

❌ When NOT to Use Context API?

Avoid Context API for high-frequency updates like:

Real-time typing state

Animations

Large dynamic data updates

In such cases, prefer:

Redux Toolkit

Zustand

Recoil

🚀 Future Improvements (Interview Bonus)

You can improve this project by adding:

✅ Multiple users switching
✅ Role-based UI rendering (admin, user)
✅ Theme switcher using Context
✅ Persist user in localStorage
✅ Add useMemo to optimize provider re-renders
✅ Add custom hook: useUser() for cleaner code

🎤 Interview Explanation (1-Minute)

This project demonstrates React Context API to share user data globally without prop drilling. I created a UserContext using createContext and wrapped components inside UserContext.Provider to provide the user object. The Profile component consumes the context using useContext and displays the user name safely using optional chaining and nullish coalescing. When I update the user state using useState, React automatically re-renders all components consuming the context, showing the updated name instantly.

📌 Key Interview Questions & Answers
Q1) What problem does Context solve?

✅ It avoids prop drilling and provides global state access.

Q2) What happens when Provider value changes?

✅ All consumer components re-render automatically.

Q3) Why use optional chaining?

✅ To prevent errors when value is null/undefined.

Q4) Why use spread operator in setUser?

✅ To maintain immutability and avoid direct mutation.

📌 Conclusion

This project is a clean beginner-friendly example of:

Context API usage

Global state sharing

Safe UI rendering

Immutable state updates.
-------------------------------------------------------------------------------------------------------------------------------------------------------------
✅ 1) Project Overview (What this project is)

This project demonstrates React Context API to share user data globally without passing props manually.

🎯 Main Goal

Instead of doing:

App → UserContextExample → Profile (props drilling)

We directly provide user data using Context Provider and consume it in Profile using useContext.

✅ 2) Project Architecture (File wise)
📌 Files

context/UserContext.js → creates global context

Profile.jsx → consumes context value

UserContextExample.jsx → provides context + updates user

App.jsx → renders main component

✅ 3) Core React Concepts Used (Definitions + Purpose)
🔹 1. createContext()
Definition

createContext() creates a global data container.

Purpose

Used to share data across multiple components without prop drilling.

Syntax
const MyContext = createContext(defaultValue);


In your code:

export const UserContext = createContext(null);


Meaning:

Default value is null

If no provider exists, consumers will receive null

🔹 2. Context.Provider
Definition

Provider is a component that supplies data to all its children.

Purpose

It passes the value to every component inside it.

Syntax
<MyContext.Provider value={someValue}>
   <Child />
</MyContext.Provider>


Your code:

<UserContext.Provider value={user}>
  <Profile />
</UserContext.Provider>


So Profile can access user.

🔹 3. useContext()
Definition

useContext(ContextName) reads the nearest provider’s value.

Purpose

It avoids passing props.

Syntax
const value = useContext(MyContext);


Your code:

const usersId = useContext(UserContext);


Now usersId contains { name: "John", role: "user" }

🔹 4. useState()
Definition

useState() stores local state inside a functional component.

Purpose

To store dynamic data and update UI automatically.

Your code:

const [user, setUser] = useState({ name: "John", role: "user" });

✅ 4) Core JavaScript Concepts Used
🔹 1. Object State (Reference Type)

user is an object. Objects are stored by reference.

So we must update immutably.

🔹 2. Spread Operator (...)
Purpose

Creates a new object copy.

Your code:

setUser((u) => ({ ...u, name: "Jane" }))


Meaning:

Copy old user properties

Update only name

🔹 3. Functional State Update
setUser((u) => ({ ...u, name: "Jane" }))


This is better than:

setUser({ ...user, name: "Jane" })


Because it guarantees latest state.

🔹 4. Optional Chaining (?.)
usersId?.name


Prevents crash if usersId is null/undefined.

🔹 5. Nullish Coalescing (??)
usersId?.name ?? "Guest"


If name is null or undefined, show "Guest".

✅ 5) Line-by-Line Explanation (Complete)
✅ A) UserContext.js
import { createContext } from "react";


➡ Imports React API to create context.

export const UserContext = createContext(null);


➡ Creates context object with default value null.
➡ Exported so other files can use it.

✅ B) Profile.jsx
import { useContext } from "react";
import { UserContext } from "./context/UserContext";


➡ Imports hook + context.

const usersId = useContext(UserContext);


➡ Reads current context value from Provider.

<p className="text-lg">
  Hello, {usersId?.name ?? "Guest"}
</p>

Explanation

If user exists → show name

If user missing → show Guest

Prevents runtime crash

✅ C) UserContextExample.jsx
const [user, setUser] = useState({ name: "John", role: "user" });


➡ Creates local state to store user object.

<UserContext.Provider value={user}>


➡ Provides user object globally.

<Profile />


➡ Profile consumes the user.

<button
  onClick={() => setUser((u) => ({ ...u, name: "Jane" }))}
>
  Change Name
</button>

Why written like this?

setUser((u)=>...) ensures latest value

{ ...u } maintains immutability

React detects new object → triggers re-render

Context provider updates → Profile re-renders automatically

✅ D) App.jsx
<UserContextExample />


➡ Root renders the example component.

✅ 6) Output Behavior (What happens on UI)
Initial Render

user = { name: "John", role: "user" }

Provider sends this value

Profile prints:

✅ Output:

Hello, John

After clicking button

setUser() updates name to Jane

Provider value changes

All consumers re-render

✅ Output:

Hello, Jane

If user becomes null

If you set:

setUser(null);


Then output becomes:

✅ Output:

Hello, Guest

✅ 7) How UI Updates Happen (React Rendering Logic)
Step-by-step React process:

Button click triggers event handler

setUser() updates state

React creates a new Virtual DOM

Provider value changes

All components using useContext(UserContext) re-render

React compares old vs new DOM (diffing)

Only changed part updates in browser

✅ 8) State Shape: Why Object?
Why store user as object?

Because user has multiple properties:

name

role

email (future)

token (future)

Object is scalable and structured.

✅ 9) Immutability: Why important?

React depends on reference comparison.

If you mutate like:

user.name = "Jane";
setUser(user);


React may not detect changes correctly.

So we create new object:

setUser((u) => ({ ...u, name: "Jane" }));

✅ 10) Time Complexity (Interview Important)
Rendering

Updating user triggers re-render for consumers.

Complexity depends on number of components consuming context.

If there are N consumers, update causes O(N) re-rendering.

Current project is small → performance is fine.

But in large apps, frequent context updates can slow down.

✅ 11) Performance Improvements (Important for Mid/Senior)
🚀 Improvement 1: Split Context

Instead of storing full user object, separate contexts:

UserContext

RoleContext

ThemeContext

Because any small update causes all consumers to re-render.

🚀 Improvement 2: useMemo Provider value

Even if value is same, new object causes re-render.

We can optimize:

const contextValue = useMemo(() => user, [user]);

<UserContext.Provider value={contextValue}>

🚀 Improvement 3: Create custom hook

Cleaner and reusable:

export const useUser = () => useContext(UserContext);

🚀 Improvement 4: Persist user in localStorage

So refresh doesn’t lose data.

✅ 12) Latest React 18+ Best Practice Version (Improved Code)
✅ UserContext.js
import { createContext, useContext } from "react";

export const UserContext = createContext(null);

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
}

✅ UserProvider.jsx (New file - best practice)
import { useMemo, useState } from "react";
import { UserContext } from "./UserContext";

export default function UserProvider({ children }) {
  const [user, setUser] = useState({ name: "John", role: "user" });

  const value = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

✅ Profile.jsx
import { useUser } from "./context/UserContext";

export default function Profile() {
  const { user } = useUser();

  return (
    <p className="text-lg">
      Hello, {user?.name ?? "Guest"}
    </p>
  );
}

✅ UserContextExample.jsx
import Profile from "./Profile";
import { useUser } from "./context/UserContext";

export default function UserContextExample() {
  const { setUser } = useUser();

  return (
    <div className="space-y-3">
      <Profile />

      <button
        onClick={() => setUser((u) => ({ ...u, name: "Jane" }))}
        className="px-3 py-1 bg-indigo-600 text-white rounded"
      >
        Change Name
      </button>
    </div>
  );
}

✅ App.jsx
import UserContextExample from "./Components/UserContextExample";
import UserProvider from "./context/UserProvider";

export default function App() {
  return (
    <UserProvider>
      <div className="p-6">
        <UserContextExample />
      </div>
    </UserProvider>
  );
}

Why this is better?

✅ Clean architecture
✅ Provider logic separated
✅ useMemo prevents unnecessary re-renders
✅ Custom hook improves readability
✅ Scalable like real projects

✅ 13) New Features You Can Add (Interview + Resume Boost)
⭐ Feature Ideas

✅ Login/Logout simulation
✅ Role-based rendering (admin/user)
✅ Theme switcher using context
✅ Multi-user selection dropdown
✅ Save user in localStorage
✅ Add API call simulation with loading state
✅ Add ErrorBoundary
✅ Add React Router integration
✅ Add TypeScript support

✅ 14) What I Learned From This Project (Interview Answer)

📌 I learned:

How Context API removes prop drilling

How Provider triggers re-rendering in consumers

How immutability affects UI updates

How optional chaining avoids runtime errors

How state updates work with functional updates

How to structure scalable React architecture

✅ 15) Common Debugging Issues / Challenges
🔥 Challenge 1: "useContext returns null"

Reason:

Component not wrapped in Provider

Fix:

Ensure <UserContext.Provider> wraps component

🔥 Challenge 2: UI not updating

Reason:

Mutating object directly

Fix:

Use spread operator {...u}

🔥 Challenge 3: Too many re-renders

Reason:

Context value object recreated each render

Fix:

useMemo Provider value

✅ 16) 2-Minute Spoken Interview Script (Strong + Simple)

🎤 Script:

This project demonstrates how to use the React Context API for global state management.
I created a UserContext using createContext, which acts like a global container to store shared data.
In the UserContextExample component, I store the user object using useState, which contains the user name and role.
Then I wrap my components inside UserContext.Provider and pass the user state as the value.

In the Profile component, I consume the context using the useContext hook. This avoids prop drilling and allows direct access to the user data.
I also used optional chaining and nullish coalescing to safely display the username and show “Guest” if the user is missing.

When the Change Name button is clicked, I update the state immutably using the spread operator, which creates a new object reference. React detects this change and re-renders the provider, so all consuming components automatically update.

This project helped me understand state sharing, immutability, re-render behavior, and how Context can be structured for scalable applications.

✅ 17) 1-Minute Elevator Pitch (Very Crisp)

This is a small React project demonstrating Context API to share user state globally. I created a UserContext using createContext and provided the user object through UserContext.Provider. The Profile component consumes it using useContext without prop drilling. On state update, React triggers re-render of context consumers. I used immutable state updates with the spread operator and safe rendering with optional chaining and nullish coalescing. This architecture is scalable for auth, theme, and app settings.

✅ 18) Ultra-Short Interview Answers (1-Line Only)

Context API: A built-in React feature for sharing global state without prop drilling.

Provider: Supplies a value to all nested components.

useContext: Reads context value from nearest provider.

useState: Stores state and triggers re-render on update.

Spread operator: Creates new object to maintain immutability.

Optional chaining: Prevents crashes when object is null/undefined.

Nullish coalescing: Gives fallback value when result is null/undefined.

✅ 19) Flashcards (Fast Revision)
🧠 Flashcard 1

Q: What does createContext do?
A: Creates a global container for shared state.

🧠 Flashcard 2

Q: Why Provider is required?
A: To supply context value to children.

🧠 Flashcard 3

Q: Why useContext is used?
A: To consume shared data directly without props.

🧠 Flashcard 4

Q: Why update state immutably?
A: React detects changes using reference comparison.

🧠 Flashcard 5

Q: What happens when Provider value changes?
A: All consuming components re-render.

✅ 20) Mock Interview Questions & Answers
✅ Basic Level
Q1) What is Context API?

Answer: Context API is a React feature that allows global state sharing without passing props through multiple levels.

Q2) What problem does it solve?

Answer: It solves prop drilling by allowing components to directly access shared data.

Q3) What is useContext?

Answer: useContext is a hook used to read context value from the nearest Provider.

Q4) Why use optional chaining?

Answer: It prevents runtime errors when the value is null or undefined.

✅ Mid-Level Questions
Q5) Why is user stored as an object?

Answer: Because user has multiple related fields like name and role, and object makes it scalable.

Q6) Why use functional state update in setUser?

Answer: It ensures we always get the latest state, avoiding stale closures.

Q7) How React UI updates after setUser?

Answer: React updates state, re-renders component, compares virtual DOM, and updates only changed parts.

Q8) How is immutability maintained?

Answer: Using spread operator {...u} which creates a new object instead of mutating old one.

✅ Senior Level Questions
Q9) What performance issue can happen with Context?

Answer: If context value changes frequently, all consumers re-render which can cause performance issues.

Q10) How to optimize Context re-renders?

Answer: Use useMemo for provider value, split contexts, and avoid passing new objects each render.

Q11) What is the best architecture for scalable context?

Answer: Create separate provider component + custom hook like useUser for clean reusable code.

Q12) When should you avoid Context API?

Answer: When state updates frequently, because it triggers many re-renders; use Redux/Zustand instead.

✅ 21) Summary (Short + Complete)

This project demonstrates:

React Context API for global state sharing

createContext, Provider, useContext, useState

Immutable updates using spread operator

Safe rendering using optional chaining and nullish coalescing

Automatic re-rendering of context consumers

TailwindCSS for UI styling
---------------------------------------------------------------------------------------------------------------------------------------------------------------
✅ 1) Project Explanation (How to Explain in Interview)
🎯 Project Name

React Context API User Profile Example

🧩 What this project does

This project demonstrates how to use React Context API to share user data globally without prop drilling.

🏗 Requirements / Domain

Domain: Frontend UI State Management

Requirement: Share user object across components

Avoid prop drilling

Update user data and automatically update UI

✅ 2) How to Explain This Solution (Interview Format)
✅ A) What state you are storing?

I am storing a user object in React state.

const [user, setUser] = useState({ name: "John", role: "user" });

Stored State Shape:
{
  name: "John",
  role: "user"
}

✅ B) Why that state shape was chosen?

Because user information naturally contains multiple properties like:

name

role

email (future)

token (future)

So storing it as an object makes the design scalable.

✅ C) How immutability is maintained?

I update the state immutably using the spread operator:

setUser((u) => ({ ...u, name: "Jane" }));


This creates a new object reference, so React detects change and re-renders.

✅ D) How UI updates happen?

When I call setUser, React:

Updates the state

Re-renders UserContextExample

Provider value changes

Profile re-renders automatically because it consumes the context

So UI updates instantly without manually refreshing.

✅ E) Time Complexity (Important Interview Point)
Context update complexity:

If there are N components consuming the context, then updating context causes O(N) re-rendering.

Current project is small → not a problem

In large apps → optimize by splitting context or memoizing provider value

✅ 3) What Interviewers Expect From This Project

Interviewers check if you understand:

✅ Context API fundamentals
✅ Prop drilling vs context
✅ State updates and immutability
✅ Re-render behavior
✅ Clean code practices
✅ Scalability and performance improvements
✅ Edge cases handling (null, undefined)

✅ 4) Core React Concepts Used (Explain Like Interviewee)
🔹 createContext

Creates a global container.

export const UserContext = createContext(null);

🔹 Provider

Shares state globally.

<UserContext.Provider value={user}>

🔹 useContext

Consumes the state.

const usersId = useContext(UserContext);

🔹 useState

Stores local state in functional components.

✅ 5) Core JavaScript Concepts Used
🔹 Spread Operator (...)

Used for immutability.

🔹 Optional Chaining (?.)

Prevents crashes when object is null.

🔹 Nullish Coalescing (??)

Fallback value if null/undefined.

usersId?.name ?? "Guest"

✅ 6) Frequently Asked Interview Questions & Answers (Basic → Advanced)
🟢 BASIC LEVEL (0–2 years)
Q1) What is Context API?

Answer:
Context API is a React feature that allows sharing data globally across components without passing props manually.

Q2) Why did you use Context API here?

Answer:
To avoid prop drilling and directly provide user data to deeply nested components.

Q3) What is prop drilling?

Answer:
Prop drilling is passing props through multiple components even if intermediate components don’t need that data.

Q4) What is the use of Provider?

Answer:
Provider supplies a value to all nested components that consume the context.

Q5) What does useContext do?

Answer:
useContext reads the nearest provider’s value and gives it directly inside the component.

Q6) What is stored in useState?

Answer:
I store a user object with name and role.

🟡 MID LEVEL (2–4 years)
Q7) Why did you store user as an object instead of separate variables?

Answer:
Because user has multiple related properties, and object state is scalable and structured.

Q8) Why are you using this syntax inside setUser?
setUser((u) => ({ ...u, name: "Jane" }));


Answer:
Because it is a functional update that guarantees latest state and maintains immutability using spread operator.

Q9) What happens when you update Provider value?

Answer:
All components consuming that context will re-render automatically.

Q10) Why optional chaining is used?

Answer:
To avoid runtime crash if user is null or undefined.

Q11) What does ?? mean in JavaScript?

Answer:
Nullish coalescing operator gives a fallback value if the left side is null or undefined.

Q12) How React detects changes?

Answer:
React detects changes using reference comparison. New object means state updated.

Q13) What is immutability?

Answer:
Immutability means we never modify the original object, instead we create a new updated copy.

🔴 ADVANCED / SENIOR LEVEL (4–6+ years)
Q14) What is the performance drawback of Context API?

Answer:
Whenever provider value changes, all consuming components re-render, which can be expensive in large applications.

Q15) How will you optimize this Context API setup?

Answer:
I will memoize the provider value using useMemo and split contexts for different responsibilities.

Q16) How do you prevent unnecessary re-renders in Context?

Answer:
By avoiding passing new object references on every render and using useMemo for the provider value.

Q17) What happens if Profile is rendered without Provider?

Answer:
Then useContext returns default value which is null, so fallback “Guest” will display.

Q18) When should we NOT use Context API?

Answer:
When state updates frequently like typing/searching because it causes multiple re-renders. Redux/Zustand is better.

Q19) What is the time complexity of context updates?

Answer:
If N components consume context, updates cause O(N) re-renders.

Q20) How will you scale this for authentication?

Answer:
I would store user + token in context, persist in localStorage, and provide login/logout functions in provider.

✅ 7) Edge Cases Interviewers Expect You to Handle
Edge Case 1: user is null

Handled by:

usersId?.name ?? "Guest"

Edge Case 2: app reload loses state

Solution:

store user in localStorage

Edge Case 3: too many re-renders

Solution:

split context

memoize provider value

✅ 8) Debugging Issues You Might Face (Real Interview Points)
🔥 Issue 1: Context value is always null

Reason: Component is outside Provider
Fix: Wrap Profile inside Provider

🔥 Issue 2: UI not updating after change

Reason: State mutation
Fix: Always create new object using spread operator

🔥 Issue 3: Too many re-renders

Reason: Context updates affect all consumers
Fix: useMemo + split contexts

✅ 9) What I Learned From This Project (Interview Answer)

Answer:
From this project, I learned how React Context API helps avoid prop drilling, how Provider updates trigger consumer re-rendering, and how immutability and object reference updates are important for React rendering.

✅ 10) New Features You Can Add (Resume Boost)
Feature Ideas

✅ Add Login/Logout
✅ Save user in localStorage
✅ Add theme switcher using context
✅ Add role-based UI (admin/user)
✅ Add API integration
✅ Add loading state and error handling
✅ Add React Router and protected routes
✅ Convert to TypeScript

✅ 11) How to Explain This Project in 2 Minutes (Spoken Script)

🎤 2-minute Interview Script:

This project demonstrates the React Context API for global state management.
I created a UserContext using createContext, which acts as a global store.
In the UserContextExample component, I store the user object using useState, which contains name and role.
Then I wrap the Profile component inside UserContext.Provider and pass the user state through the provider value.

Inside the Profile component, I use useContext to directly access user data without passing props, which avoids prop drilling.
I also used optional chaining and nullish coalescing to safely handle cases where user might be null, so it displays Guest instead of crashing.

When the Change Name button is clicked, I update the state immutably using the spread operator. React detects the new object reference, re-renders the provider, and automatically updates all consumers like Profile.

This project helped me understand global state sharing, immutability, and how React re-renders components based on context changes.
For scalability, I can optimize by memoizing the provider value and splitting contexts to avoid unnecessary re-renders.

✅ 12) Ultra Short Answers (1-Line)

Context API: Global state sharing tool in React.

Provider: Supplies shared value to children.

useContext: Reads provider value.

useState: Stores local state.

Spread operator: Creates new object for immutability.

Optional chaining: Prevents null crash.

Nullish coalescing: Provides fallback.

✅ 13) Flashcards (Quick Revision)
⚡ Flashcard 1

Q: Why Context API?
A: To avoid prop drilling.

⚡ Flashcard 2

Q: What triggers Profile re-render?
A: Provider value update.

⚡ Flashcard 3

Q: Why spread operator?
A: For immutable updates.

⚡ Flashcard 4

Q: When avoid Context?
A: High-frequency updates.

⚡ Flashcard 5

Q: Complexity of context update?
A: O(N) consumers.

✅ 14) Most Common Interview Questions They WILL Ask
🔥 Must Prepare

Why Context instead of props?

What happens when Provider value changes?

How do you maintain immutability?

How do you avoid unnecessary re-renders?

When should you use Redux instead?

What if user is null?

How to persist data on refresh?

✅ 15) Best Mid-Level / Senior Upgrade Code (Professional Answer)

If interviewer asks: “Improve this code”, you say:

Improvements:

✅ Create Provider component
✅ Add useMemo
✅ Add custom hook
✅ Provide both user and setter in context

Example improved provider value:

const value = useMemo(() => ({ user, setUser }), [user]);

✅ Final Interview Summary Answer (Strong Ending)

This project is a simple example of React Context API where user data is stored in state and shared globally using a Provider. The Profile component consumes it using useContext, avoiding prop drilling. State updates are handled immutably using spread operator so React re-renders efficiently. For large-scale apps, I can optimize using useMemo and split contexts to reduce unnecessary re-renders.
