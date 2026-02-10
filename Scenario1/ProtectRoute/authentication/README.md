📌 React Protected Route Authentication (Vite + React Router + Tailwind)

A simple React application demonstrating Protected Routing (Private Routes) using React Router v6+ with basic authentication state stored in localStorage.

This project is useful for understanding how authentication-based navigation works in real-world React apps like dashboards, admin panels, and profile pages.

🚀 Features

✅ Login / Logout functionality
✅ Authentication state handled using React useState
✅ Authentication persistence using localStorage
✅ Protected routes using a reusable ProtectRoute component
✅ Redirect unauthenticated users to /login
✅ Uses Navigate from React Router v6+
✅ Styled using TailwindCSS

🧠 Core Concepts Covered
🔹 React Concepts

useState() for auth state management

useEffect() to load stored login state on refresh

props for passing state setters (setIsAuth)

children prop pattern for reusable wrapper components

Conditional rendering based on authentication state

🔹 React Router Concepts

BrowserRouter for routing setup

Routes and Route for route definitions

useNavigate() for programmatic navigation

Navigate for redirecting unauthorized users

Protected route pattern

🔹 JavaScript Concepts

localStorage.setItem() and localStorage.getItem()

localStorage.removeItem()

Boolean logic (isAuth ? children : redirect)

Functions and event handlers

🔹 TailwindCSS Concepts

Utility-first styling (bg-red-600, text-center, rounded-lg)

Responsive and reusable styling classes

🛠 Tech Stack

⚛️ React (18+/19+)

⚡ Vite

🧭 React Router DOM (v6+)

🎨 TailwindCSS

📂 Folder Structure
src/
│── Components/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── ProtectRoute.jsx
│
│── App.jsx
│── main.jsx
│── App.css
│── vite.config.js

📌 How Authentication Works (Project Flow)
✅ Step-by-step Flow

User opens the app

App checks localStorage inside useEffect

If "isAuth" === "true" → user stays logged in

If not logged in → user gets redirected to /login

On Login button click:

localStorage.setItem("isAuth", "true")

setIsAuth(true)

redirect to /

On Logout button click:

localStorage.removeItem("isAuth")

setIsAuth(false)

redirect to /login

🔐 Protected Route Logic
ProtectRoute.jsx
return isAuth ? children : <Navigate to="/login" replace />;


Meaning:

If user is authenticated (isAuth === true) → render protected page

Else → redirect to login page

🧾 UI Behavior Table
Auth State (isAuth)	Output
true	Shows Home Page
false	Redirects to /login
undefined	Shows nothing / prevents flicker
🧑‍💻 Installation & Setup
1️⃣ Clone Repository
git clone <your-repo-link>
cd project-folder

2️⃣ Install Dependencies
npm install

3️⃣ Run Development Server
npm run dev


App runs at:

http://localhost:5173

📦 Required Dependencies

Install React Router:

npm install react-router-dom


Install TailwindCSS:

npm install tailwindcss @tailwindcss/vite

🧪 Testing the Project
✅ Test Scenario 1: Unauthorized User

Open /

Automatically redirected to /login

✅ Test Scenario 2: Login

Click Login button

Redirected to /

Home page shown

✅ Test Scenario 3: Refresh Page

Refresh browser

Still stays logged in because localStorage is preserved

✅ Test Scenario 4: Logout

Click Logout

Redirected to /login

localStorage cleared

⚡ Key Code Highlights
🔹 useEffect() for persistence
useEffect(() => {
  const savedAuth = localStorage.getItem("isAuth");
  if (savedAuth === "true") {
    setIsAuth(true);
  }
}, []);


Purpose:

Keeps user logged in even after refresh.

🔹 useNavigate() for redirecting
navigate("/login");


Purpose:

Programmatic navigation after login/logout.

🔹 localStorage as session storage
localStorage.setItem("isAuth", "true");


Purpose:

Stores authentication state in browser storage.

⚠️ Limitations (Important for Interviews)

❌ Not real authentication (no backend validation)
❌ localStorage can be manually edited by user
❌ No JWT token validation
❌ No role-based authorization
❌ Not secure for production apps

🚀 Future Improvements (Interview Strong Points)

You can upgrade this project by adding:

✅ JWT Token Authentication
✅ Role-Based Routing (Admin/User)
✅ API-based authentication check
✅ Refresh token handling
✅ React Context / Redux for global auth state
✅ Loader UI for async auth validation
✅ Protected Nested Routes
✅ Logout on token expiration
✅ Private Layout (Navbar, Sidebar)
✅ Axios interceptors for API security

🎯 Interview Explanation (2 Lines)

This project demonstrates protected routing in React Router v6 using a reusable ProtectRoute wrapper component. It stores authentication state in localStorage to persist login after refresh and redirects unauthenticated users to the login page.

🧠 1-Line Interview Answer

I implemented private routing using React Router v6 Navigate and stored auth state in localStorage for persistence.

📌 Conclusion

This project is a clean example of:

React authentication flow

Protected routes

localStorage persistence
--------------------------------------------------------------------------------------------------------------------------------------------------
✅ 1) Project Architecture (What this project is)
📌 Project Name

Protected Route Authentication using React Router v6 + localStorage

📌 Purpose

This project demonstrates how to protect private pages like Dashboard/Home so that only logged-in users can access them.

📌 Real-world domain

Used in:

Banking apps

Admin dashboards

Employee portals

E-commerce user profile pages

✅ 2) Folder Structure (Architecture)
src/
 ├── Components/
 │    ├── Home.jsx
 │    ├── Login.jsx
 │    ├── ProtectRoute.jsx
 ├── App.jsx
 ├── main.jsx
 ├── App.css
 ├── vite.config.js

Why this structure?

Because React apps should follow component separation:

UI pages in separate components

routing logic in App.jsx

protection logic in ProtectRoute.jsx

This makes code reusable and scalable.

✅ 3) Core React Concepts Used (React Side)
🔥 A) useState()
const [isAuth, setIsAuth] = useState(false);

Definition

useState() is a React hook used to store component state.

Purpose here

It stores whether the user is authenticated or not.

Why boolean state?

Because authentication is basically:

true = logged in

false = logged out

🔥 B) useEffect()
useEffect(() => {
  const savedAuth = localStorage.getItem("isAuth");
  if (savedAuth === "true") {
    setIsAuth(true);
  }
}, []);

Definition

useEffect() runs side effects after render.

Purpose here

It checks localStorage when app loads, so login stays even after refresh.

Why dependency array []?

Because we want it to run only once on initial mount.

🔥 C) React Router v6 Concepts
BrowserRouter

Wraps the app and enables routing.

<BrowserRouter>

Routes & Route

Defines route paths and UI.

<Routes>
  <Route path="/" element={...} />
</Routes>

Navigate

Used to redirect users.

<Navigate to="/login" replace />

useNavigate()

Used for programmatic navigation after login/logout.

const navigate = useNavigate();
navigate("/login");

🔥 D) children prop
<ProtectRoute isAuth={isAuth}>
  <Home setIsAuth={setIsAuth} />
</ProtectRoute>

Definition

children means: whatever component is written inside a wrapper component.

Why use children?

Because ProtectRoute becomes reusable for any page.

✅ 4) Core JavaScript Concepts Used (JavaScript Side)
🔹 localStorage
localStorage.setItem("isAuth", "true");
localStorage.getItem("isAuth");
localStorage.removeItem("isAuth");

Definition

localStorage is browser storage used to store key-value data permanently.

Why string "true"?

Because localStorage stores values only as strings, not booleans.

🔹 Conditional Logic (Ternary Operator)
return isAuth ? children : <Navigate to="/login" replace />;

Meaning

If authenticated → show Home
Else → redirect to Login

🔹 Functions + Event Handling
const handleLogin = () => { ... }
const handleLogout = () => { ... }


React uses functions as event handlers for UI actions.

✅ 5) Code Logic Explanation (Step-by-Step Flow)
🟦 Step 1: App loads

isAuth initially is false

useEffect() runs and checks localStorage

If localStorage has "true" → user stays logged in.

🟦 Step 2: User opens "/"

Route is:

<Route
  path="/"
  element={
    <ProtectRoute isAuth={isAuth}>
      <Home setIsAuth={setIsAuth} />
    </ProtectRoute>
  }
/>


So Home is wrapped inside ProtectRoute.

🟦 Step 3: ProtectRoute checks auth
return isAuth ? children : <Navigate to="/login" replace />;


If isAuth=true → Home renders

If isAuth=false → redirect to /login

🟦 Step 4: User clicks Login button

Login component runs:

localStorage.setItem("isAuth", "true");
setIsAuth(true);
navigate("/");


So:

auth becomes true

user redirected to Home

🟦 Step 5: User clicks Logout

Home component runs:

localStorage.removeItem("isAuth");
setIsAuth(false);
navigate("/login");


So:

auth removed

redirected to login

✅ 6) Output Behavior (What happens in UI)
User Action	localStorage	isAuth state	Output
Open "/" without login	empty	false	Redirect to login
Click Login	"true"	true	Goes to Home
Refresh page	"true"	true	Still Home
Click Logout	removed	false	Back to login
✅ 7) Why we wrote code like this? (Interview Explanation)
Why store auth in App?

Because App controls routing, so it should manage global auth state.

Why use ProtectRoute component?

To avoid repeating auth logic in every route.

Why use localStorage?

To persist login after page refresh.

Why use Navigate?

Because React Router v6 uses <Navigate /> for redirecting.

✅ 8) Time Complexity (Interview Answer)
Login / Logout

localStorage.setItem() is O(1)

localStorage.removeItem() is O(1)

state update is O(1)

Route protection

conditional check is O(1)

✅ Overall complexity: O(1)
Because we are only checking a boolean value.

✅ 9) What Interviewers Expect from this Project

Interviewers check:

✅ Do you understand React Router v6?
✅ Do you know state + props?
✅ Can you persist auth state?
✅ Can you handle refresh properly?
✅ Can you explain security limitations?
✅ Can you improve this to JWT/API-based auth?

✅ 10) Weakness of Current Project (Important!)

This is not real security.

Why?

Because localStorage can be edited manually in browser DevTools.

So this is good for learning routing, but not production security.

✅ 11) Performance Improvements (React + UI)
🔥 Improvement 1: Prevent flicker using loading state

Currently:

initial state is false

app redirects quickly

small flicker may happen

Solution:
Use null initial state.

const [isAuth, setIsAuth] = useState(null);


Then show loader while checking.

🔥 Improvement 2: Use Context API

Instead of passing setIsAuth through props, use:

AuthContext

useContext()

🔥 Improvement 3: Add token expiry validation

Store:

token

expiry time

Then validate in useEffect.

✅ 12) Latest React 18+ Improved Code (Best Practice)
✅ App.jsx (Improved)
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import ProtectRoute from "./Components/ProtectRoute";

function App() {
  const [isAuth, setIsAuth] = useState(null); // 👈 null means "loading"

  useEffect(() => {
    const savedAuth = localStorage.getItem("isAuth");
    setIsAuth(savedAuth === "true");
  }, []);

  if (isAuth === null) {
    return <h2 className="text-center mt-10 text-xl">Checking auth...</h2>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectRoute isAuth={isAuth}>
              <Home setIsAuth={setIsAuth} />
            </ProtectRoute>
          }
        />

        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

✅ ProtectRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ isAuth, children }) => {
  return isAuth ? children : <Navigate to="/login" replace />;
};

export default ProtectRoute;

✅ 13) Features You Can Add to this Project (Interview Strong Points)
Beginner Additions

✅ Show username
✅ Add Login form validation
✅ Add error messages

Intermediate Additions

✅ Add multiple protected pages (Dashboard/Profile)
✅ Add 404 page
✅ Add Navbar with Logout
✅ Add toast notifications

Advanced Additions

🔥 JWT authentication
🔥 Role-based routing (Admin/User)
🔥 API authentication check
🔥 Axios interceptor
🔥 Refresh token
🔥 Private Layout (Sidebar + Header)

✅ 14) What I Learned from This Project (Interview Answer)

You can say:

I learned how to implement protected routing using React Router v6.

I understood how to use localStorage for persistence.

I explored how conditional rendering prevents unauthorized access.

I learned how to manage auth state using React hooks.

I improved routing experience using Navigate and programmatic navigation.

✅ 15) Challenges Faced + Debugging Issues
Common issues:

❌ Page refresh logs out user
➡️ Fixed by loading auth state from localStorage inside useEffect.

❌ User can access "/" directly
➡️ Fixed using ProtectRoute wrapper.

❌ Infinite redirect loop
➡️ Happens if you redirect wrongly inside effect. Fixed by correct routing.

✅ 16) 2-Minute Spoken Interview Script (Strong Answer)

“This is a React authentication routing project built using React Router v6, Vite, and Tailwind CSS.
The main goal is to protect private routes like the Home page so only authenticated users can access it.
I store authentication state using the useState hook inside App.jsx, and I persist the login status using localStorage.
When the app loads, I use useEffect to read the stored value from localStorage and update the isAuth state.
For route protection, I created a reusable ProtectRoute component that accepts isAuth and children.
If isAuth is true, it renders the children component, otherwise it redirects to the login page using Navigate.
On login, I set localStorage and update state, then navigate to the Home route.
On logout, I clear localStorage, reset auth state, and redirect back to login.
This project helped me understand protected routing, state persistence, and clean reusable routing patterns.”

✅ 17) 1-Minute Elevator Pitch

“I built a protected routing system using React Router v6 where unauthorized users cannot access private pages. I used useState for auth state and useEffect to persist authentication using localStorage. I implemented a reusable ProtectRoute component using children and Navigate for redirection. This project demonstrates real-world routing patterns used in dashboards and secured applications.”

✅ 18) Flashcards (Quick Revision)
📌 Flashcard 1

Q: What is ProtectRoute?
A: A wrapper component that allows or blocks route access.

📌 Flashcard 2

Q: Why use children prop?
A: To make ProtectRoute reusable for any component.

📌 Flashcard 3

Q: Why use localStorage?
A: To persist login after refresh.

📌 Flashcard 4

Q: What does Navigate do?
A: Redirects user to another route.

📌 Flashcard 5

Q: Why useEffect?
A: To load saved auth state on app mount.

✅ 19) Ultra Short Answers (1-Line)

✅ What is protected routing?
Restricting access to pages unless user is authenticated.

✅ Why localStorage?
To keep auth state even after browser refresh.

✅ Why useNavigate?
For programmatic navigation after login/logout.

✅ Why Navigate replace?
To prevent user going back to protected route.

✅ Why useEffect?
To fetch stored auth state on app load.

✅ 20) Mock Interview Q&A (Mid Level)
Q1: Why did you use ProtectRoute?

A: To centralize authentication logic and reuse it for multiple private routes.

Q2: What happens when user refreshes?

A: useEffect reads localStorage and restores isAuth.

Q3: What is the purpose of replace in Navigate?

A: It prevents browser back navigation to restricted pages.

Q4: Is this secure authentication?

A: No, localStorage is not secure; real apps use JWT + backend validation.

Q5: How can you improve this project?

A: Use Context API, JWT, refresh tokens, and server-side session validation.

✅ 21) Senior Level Interview Questions
Q1: Why is localStorage unsafe?

A: Because users can manually edit it and inject auth state.

Q2: How to implement real auth?

A: Use JWT token stored securely and validate token using API.

Q3: How to handle token expiry?

A: Use refresh tokens and auto logout when token expires.

Q4: How would you scale routing?

A: Use nested routes, layout components, and auth context provider.

Q5: How do you prevent unauthorized API calls?

A: Use Axios interceptors to attach tokens and handle 401 globally.

✅ 22) Summary (Final Interview Conclusion)
📌 What state you store?

isAuth boolean state

📌 Why state shape chosen?

boolean is simplest for auth true/false

📌 How immutability is maintained?

React state updates using setter functions, not direct mutation

📌 How UI updates happen?

state change triggers re-render automatically

📌 Time complexity?

O(1), constant time operations.
React Router v6 navigation

clean component structure

-------------------------------------------------------------------------------------------------------------------------------------------------------------
✅ Project Interview Explanation Format (What Interviewers Expect)

When recruiter asks: “Explain your project”, you must cover:

1) What state you store

👉 isAuth state (boolean)

2) Why that state shape was chosen

👉 boolean is simplest for login/logout

3) How immutability is maintained

👉 React state updated using setIsAuth(), not direct mutation

4) How UI updates happen

👉 React re-renders automatically when state changes

5) Time complexity

👉 O(1) because localStorage + boolean checks are constant-time

✅ 1) Project Requirements (What problem you solved)
📌 Requirement

User should not access Home page without login.

After login, user should access Home.

After logout, user should redirect to login.

On refresh, login should persist.

📌 Domain

Used in:

Dashboard apps

Admin portals

User profile pages

Banking apps

✅ 2) What State You Are Storing (Interview Answer)
State:
const [isAuth, setIsAuth] = useState(false);

Interview Answer:

I am storing authentication status in isAuth state to decide whether the user can access protected routes or not.

✅ 3) Why This State Shape Was Chosen
Why boolean?

Because authentication is binary:

true → logged in

false → logged out

Interview Answer:

I chose a boolean state because authentication is a simple yes/no condition, and it is easy to validate in route protection.

✅ 4) How Immutability is Maintained
Key concept:

React state should never be mutated directly.

You did:

setIsAuth(true);
setIsAuth(false);

Interview Answer:

Immutability is maintained because I never modify state directly. Instead, I use React’s state setter function which creates a new state and triggers re-render.

✅ 5) How UI Updates Happen
Logic:

When setIsAuth(true) happens:

React updates Virtual DOM

compares with previous DOM (diffing)

updates only required UI parts

Interview Answer:

UI updates automatically because React re-renders the component when state changes. So authentication state directly controls routing output.

✅ 6) Time Complexity (Strong Interview Answer)
Login / Logout operations:

localStorage set/remove → O(1)

state update → O(1)

route condition check → O(1)

Final complexity:

✅ O(1)

Interview Answer:

Time complexity is constant O(1) because it only checks a boolean value and performs constant localStorage operations.

✅ 7) Code Logic (Step-by-Step Explanation)
🔥 Step 1: App loads
useEffect(() => {
  const savedAuth = localStorage.getItem("isAuth");
  if (savedAuth === "true") {
    setIsAuth(true);
  }
}, []);

Why?

To keep user logged in after refresh.

🔥 Step 2: ProtectRoute runs
return isAuth ? children : <Navigate to="/login" replace />;

Meaning:

If logged in → show Home

If not logged in → redirect login

🔥 Step 3: Login button clicked
localStorage.setItem("isAuth", "true");
setIsAuth(true);
navigate("/");

What happens?

auth stored permanently

state updated

user redirected to Home

🔥 Step 4: Logout button clicked
localStorage.removeItem("isAuth");
setIsAuth(false);
navigate("/login");

What happens?

auth removed

state becomes false

redirected to login

✅ 8) Output Behavior (UI Result)
Condition	UI Output
Not logged in	Redirect to Login
Logged in	Home Page shown
Refresh after login	Still Home
Logout	Back to Login
✅ 9) Core React Concepts Used (Must Say in Interview)
✅ React Hooks

useState → store auth state

useEffect → restore auth on refresh

✅ React Router v6 concepts

Routes, Route

Navigate

useNavigate

BrowserRouter

✅ children prop

Used for reusable wrapper component.

✅ 10) Core JavaScript Concepts Used
localStorage API

setItem

getItem

removeItem

Conditional rendering

ternary operator

if statements

Function handling

event handlers (onClick)

✅ 11) What Interviewers May Ask (Basic Level)
Q1: What is useState?

A: A hook used to store and update component state.

Q2: Why useEffect is used?

A: To run side effects like reading localStorage on component mount.

Q3: What is Navigate?

A: A React Router v6 component used for redirecting.

Q4: Why useNavigate?

A: To redirect programmatically after login/logout.

Q5: What is protected route?

A: A route that requires authentication before rendering a page.

✅ 12) Mid-Level Interview Questions + Answers
Q1: Why did you create ProtectRoute as separate component?

A: To make routing reusable and avoid repeating authentication logic for every private route.

Q2: What is children in React?

A: children is a special prop that represents nested JSX passed inside a component.

Example:

<ProtectRoute>
  <Home />
</ProtectRoute>

Q3: How do you persist authentication after refresh?

A: I store auth flag in localStorage and restore it in useEffect.

Q4: Why localStorage stores "true" not true?

A: Because localStorage stores only strings.

Q5: What is replace in Navigate?

A: It prevents users from going back to the protected page using browser back button.

✅ 13) Senior-Level Interview Questions + Answers
Q1: Is localStorage authentication secure?

A: No. Users can modify localStorage manually. Real apps use JWT + server validation.

Q2: How would you implement real authentication?

A: Use JWT access token + refresh token and validate token from backend.

Q3: How do you prevent unauthorized API calls?

A: Use Axios interceptors to attach token in headers and handle 401 responses.

Q4: How to implement role-based routing?

A: Store role in auth state and check role inside ProtectRoute.

Example:

if(role !== "admin") return <Navigate to="/unauthorized" />

Q5: How do you handle async auth check?

A: Use loading state like null and show loader until auth status is confirmed.

✅ 14) Improvements (Performance + Scalability)
Improvement 1: Use null instead of false initially

Avoid flicker.

const [isAuth, setIsAuth] = useState(null);

Improvement 2: Use AuthContext instead of prop drilling

So Home/Login don’t need setIsAuth prop.

Improvement 3: Add Loader UI

Show "Checking session..."

Improvement 4: Use backend authentication API

Instead of localStorage flag.

✅ 15) Features You Can Add (For Resume / Interview)
Basic Features

✅ Add email/password form
✅ Add validation
✅ Add error UI

Mid-Level Features

✅ Add multiple pages (Profile, Dashboard)
✅ Add 404 NotFound page
✅ Add toast notifications

Advanced Features

🔥 JWT login system
🔥 Refresh token flow
🔥 Role-based access
🔥 Session timeout auto logout
🔥 Protected nested routing

✅ 16) Challenges Faced (Interview Experience Answer)
Challenge 1: Refresh resets auth

Solved using localStorage + useEffect.

Challenge 2: Unauthorized access to Home

Solved using ProtectRoute wrapper.

Challenge 3: Back button after logout

Solved using <Navigate replace />

✅ 17) What I Learned (Interview Answer)

You can say:

I learned how React Router v6 manages routing, how to implement protected routes using wrapper components, how to persist authentication using localStorage, and how state changes control UI rendering.

✅ 18) 1-Minute Elevator Pitch (Interview Ready)

“I built a protected route authentication system using React Router v6, Vite, and Tailwind CSS. I manage authentication state using useState and persist it using localStorage so login survives refresh. I created a reusable ProtectRoute wrapper component using children and Navigate. If the user is authenticated, it renders the protected page, otherwise it redirects to login. This project helped me understand routing patterns, state-driven UI rendering, and real-world auth flow structure.”

✅ 19) Ultra Short 1-Line Answers

✅ What is ProtectRoute?
A wrapper component that restricts access to routes.

✅ What is children?
Nested JSX passed inside a component.

✅ Why localStorage?
To persist login after refresh.

✅ How UI updates?
State update triggers re-render automatically.

✅ Time complexity?
O(1) constant time.

✅ 20) Mock Interview Q&A (Recruiter Style)
Q: Explain your project in simple words.

A: I built a login/logout system where users can access Home only after authentication.

Q: Why did you use useEffect?

A: To restore login state from localStorage on page refresh.

Q: How do you block unauthorized users?

A: Using ProtectRoute which redirects to /login.

Q: What happens when user logs out?

A: I remove localStorage auth flag, update state, and redirect to login.

Q: Is it production secure?

A: No, because localStorage can be modified; production requires token validation from backend.

✅ 21) Final Summary (Without Missing Anything)
This project demonstrates:

✅ React Router protected routing
✅ localStorage persistence
✅ useState and useEffect usage
✅ conditional rendering and redirection
✅ clean separation of Home/Login/ProtectRoute
✅ scalable routing architecture
