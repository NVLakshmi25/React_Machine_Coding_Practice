🛡️ React JWT Authentication System
Project Overview

This project is a React 18 + Vite application demonstrating JWT authentication with access tokens and refresh tokens. It provides:

Secure login/session management

Global authentication state with React Context

Automatic token injection into API requests via Axios interceptors

Silent refresh of expired tokens without user disruption

Simple UI indicating login state (Loading / Login / Dashboard)

TailwindCSS styling for responsive design

Table of Contents

Features

Architecture

Technologies

Core Concepts

How It Works

Code Explanation

Security Best Practices

Running the Project

Potential Improvements

Interview Notes

Features

✅ Authentication with JWT tokens

✅ Access token stored in React state

✅ Refresh token stored as HTTP-only secure cookie on server

✅ Axios interceptors for automatic token attachment

✅ Silent token refresh to prevent user logout

✅ Centralized AuthContext for global state management

✅ Loading, login, and authenticated dashboard UI

✅ Clean, responsive UI with TailwindCSS

Architecture
App
 ├─ AuthProvider (Context)
 │    ├─ Stores accessToken in state
 │    └─ Axios interceptors handle token injection + refresh
 ├─ App Component
 │    ├─ Shows Loading / Login / Dashboard
 └─ API (axios instance)
      ├─ Base URL & credentials
      ├─ Request interceptor → adds Authorization
      └─ Response interceptor → handles 403 / refresh token


React Context: Global store for access token

Axios interceptors: Centralize API auth logic

React State: Tracks undefined (loading), null (logged out), or token (logged in)

useLayoutEffect: Ensures interceptors exist before UI paints

Technologies

React 18 – Modern React with Hooks (useState, useEffect, useLayoutEffect, useContext)

Vite – Fast build tool for React apps

Axios – HTTP client for API requests

TailwindCSS – Styling and layout

JavaScript ES6+ – Async/await, spread operators, arrow functions

HTML5 – Basic DOM and semantic structure

Core Concepts
Concept	Usage in Project
React Context	Global auth state (AuthContext)
useState	Store access token (undefined, null, string)
useEffect	Fetch initial session on app load
useLayoutEffect	Ensure Axios interceptors run before UI paints
Axios Interceptors	Attach token automatically, handle 403 → refresh
Async/Await	Handle API requests sequentially
JWT	Access token (short-lived) & refresh token (long-lived)
Conditional Rendering	Show Loading, Login, or Dashboard based on token
TailwindCSS	Styling, spacing, responsive layout
HTTP-only Cookie	Store refresh token safely on server
_retry flag	Prevent infinite refresh loops
How It Works

On app load:

AuthProvider fetches /auth/me → sets access token in state

undefined → loading, null → user not logged in, string → authenticated

Request Interceptor (useLayoutEffect):

Adds Authorization: Bearer <token> to every request

Runs before UI paints → prevents race conditions

Response Interceptor (useLayoutEffect):

Intercepts 403 Unauthorized errors

Calls /auth/refresh

Updates state with new token

Retries original request automatically

_retry prevents infinite loops

Logout:

setAccessToken(null) → clears access token

Redirects UI to login

UI Behavior:

Access token undefined → Loading

Access token null → Please Login

Access token string → Dashboard

Code Explanation

1️⃣ AuthContext.js

export const AuthContext = createContext(null);


Creates a global store for authentication.

2️⃣ AuthProvider.jsx

useState(undefined) → loading

useEffect → fetch session

useLayoutEffect → attach Axios interceptors before paint

Handles 403 → refresh token → retry request

3️⃣ api.js

const api = axios.create({ baseURL: "...", withCredentials: true });


Base Axios instance for all API calls

withCredentials → sends cookies for refresh token

4️⃣ App.jsx

const { accessToken } = useAuth();


Reads auth state from context

Conditional rendering: Loading / Login / Dashboard

5️⃣ main.jsx

Wrap App in AuthProvider

Ensures context is available globally

Security Best Practices

Access token in memory (React state) → avoids XSS attacks

Refresh token in HTTP-only cookie → server only access

Short-lived access tokens → reduce exposure if compromised

Silent refresh → smooth UX, prevents forced logout

Running the Project

Install dependencies:

npm install


Run backend server (port 4000):

npm run server


Run frontend (Vite):

npm run dev


Open http://localhost:5173

Potential Improvements

Add login/logout forms with validations

Add role-based access control

Add error handling UI (toast notifications)

Persist access token in session storage (optional)

Add Tailwind animations for loading and transitions

Add unit tests for interceptors & context

Interview Notes / Elevator Pitch

“This project demonstrates JWT authentication in React using Context and Axios interceptors.
The AuthProvider stores a short-lived access token in memory and attaches it automatically to requests.
If the token expires, the response interceptor silently refreshes it using an HTTP-only refresh token stored on the server.
This ensures security, prevents XSS attacks, and maintains a seamless user experience.
Conditional rendering displays Loading / Login / Dashboard based on token state.
The architecture is scalable, secure, and centralized, and I’ve implemented React 18 best practices with TailwindCSS for UI.”

✅ This README covers:

Project purpose & architecture

Core React & JS concepts

JWT flow & security best practices

UI & UX behavior

Running instructions & improvements

Interview talking points
-------------------------------------------------------------------------------------------------------------------------------------------------------
🔹 Project: React JWT Authentication with Axios Interceptors
1. Project Architecture & Purpose

Purpose:
Secure authentication in React using access tokens (memory) and refresh tokens (HTTP-only cookie). Provides silent token refresh and centralized auth management.

Architecture:

main.jsx
 └─ AuthProvider (Context)
      ├─ Stores accessToken in useState
      ├─ Request Interceptor (adds token)
      └─ Response Interceptor (handles 403 → refresh → retry)
 └─ App.jsx
      ├─ Reads accessToken
      └─ Conditional rendering: Loading / Login / Dashboard
 └─ api.js
      └─ Axios instance: baseURL + withCredentials


React Features Used:

useState → Track access token (undefined=loading, null=logged out, string=logged in)

useEffect → Fetch session on app load

useLayoutEffect → Ensure Axios interceptors exist before UI paints

useContext → Global state access (AuthContext)

React Context → Global auth store

Conditional rendering → UI changes based on token

JavaScript Concepts Used:

Async/Await → API calls

Axios Interceptors → Request/response hooks

Spread operator ... → Immutable state updates

Optional chaining ?. → Safe property access

2. Code Explanation (Line by Line)
AuthContext.js
export const AuthContext = createContext(null);


Creates a global store for auth state.

AuthProvider.jsx
const [accessToken, setAccessToken] = useState(undefined);


undefined → session loading

null → user logged out

string → user logged in

useEffect(() => { fetchMe(); }, []);


Fetch session once on component mount.

useLayoutEffect(() => { /* request interceptor */ }, [accessToken]);


Adds Authorization header before paint

Runs whenever accessToken changes

useLayoutEffect(() => { /* response interceptor */ }, []);


Handles 403 → calls /auth/refresh → retries request

_retry flag prevents infinite loops

<AuthContext.Provider value={{ accessToken, setAccessToken }}>
  {children}
</AuthContext.Provider>


Makes token accessible globally via useContext.

api.js
const api = axios.create({ baseURL: "http://localhost:4000/api", withCredentials: true });


Base Axios instance

withCredentials → allows cookies (refresh token)

useAuth.js
export const useAuth = () => useContext(AuthContext);


Hook for simplified context access

App.jsx
if (accessToken === undefined) return <p>Loading...</p>;
if (accessToken === null) return <p>Please Login</p>;
return <h1>Dashboard - Authenticated ✅</h1>;


Conditional rendering based on token state

main.jsx
<AuthProvider>
  <App />
</AuthProvider>


Context provider must wrap App

Otherwise useAuth() returns null

3. Output Behavior
Token State	UI Output
undefined	Loading...
null	Please Login
string	Dashboard - Authenticated ✅

Silent refresh → avoids user logout

Centralized auth → prevents scattered token logic

4. Potential Improvements

Add login/logout forms

Add role-based access

Error handling UI (toast notifications)

Use React Query or SWR for data fetching + caching

Unit tests for interceptors & context

Optimize Axios interceptor memory management

5. Features Summary

JWT auth (access + refresh token)

Axios interceptors → auto attach token & retry expired requests

Context → global state

useLayoutEffect → ensures interceptors exist before UI paints

Memory storage → protects from XSS

Conditional UI → Loading/Login/Dashboard

6. 2-Minute Interview Script

“This project implements secure JWT authentication in React 18 using Vite.
We use React Context to store the access token in memory. The token starts as undefined while loading, becomes null if the user is logged out, and stores the JWT string if authenticated.
Axios interceptors handle automatic token attachment for requests. The response interceptor handles 403 unauthorized errors by calling the refresh endpoint, updating the token in memory, and retrying the original request, ensuring a seamless user experience.
This approach avoids storing tokens in localStorage or sessionStorage, preventing XSS attacks.
We also leverage useLayoutEffect to ensure interceptors run before the UI paints, maintaining consistent authorization headers.
The UI conditionally renders Loading, Login, or Dashboard based on the token state.
This architecture is scalable, centralized, and secure, and can be extended for role-based access, error handling, or testing frameworks.”

7. Flashcards / Ultra-Short Answers
Question	Answer (1-line)
Where is access token stored?	React state (memory)
Where is refresh token stored?	HTTP-only cookie on server
Why use useLayoutEffect?	Ensure interceptors exist before paint
Why not localStorage?	Vulnerable to XSS
What does _retry do?	Prevents infinite refresh loops
How do interceptors help?	Auto attach token + retry expired requests
What happens if refresh fails?	setAccessToken(null) → show login
Why conditional rendering?	Show Loading/Login/Dashboard based on token state
Axios withCredentials?	Allows sending HTTP-only cookies
React Context purpose?	Global auth state accessible via useAuth()
------------------------------------------------------------------------------------------------------------------------------------------------------
🔹 Project Interview Analysis & Questions
1. Explaining the Project in an Interview

Elevator Pitch (1–2 minutes):

"This project is a React 18 + Vite application that demonstrates a secure JWT-based authentication system with a dynamic file/folder explorer. The file/folder explorer uses recursive rendering and state to manage expanding folders and adding/removing nodes. For authentication, the app stores a short-lived access token in memory and a long-lived refresh token in an HTTP-only cookie. Axios interceptors handle automatic token attachment and silent token refresh, ensuring a seamless UX without exposing tokens to XSS attacks. The app is built with React Context, useState, useEffect, useLayoutEffect, and TailwindCSS for UI styling. This architecture demonstrates scalable state management, immutable updates, and centralized authentication logic."

2. Core Concepts & Interview Talking Points
React Concepts

useState → Tracks access tokens or node expansion.

useEffect → Fetch initial session or API data.

useLayoutEffect → Ensures Axios interceptors are set before UI paint.

useContext / React Context → Global auth state management.

Recursive Component Rendering → ListObjects renders nested folders/files.

Conditional Rendering → Show Loading/Login/Dashboard based on token.

Immutability → Spread operator ... used to update nested trees.

JavaScript Concepts

Async/Await → Fetching data from backend API.

Optional Chaining ?. → Safe access for nested children.

Axios Interceptors → Centralized token management.

_retry flag → Prevent infinite refresh loops.

Prompt API → Simple user input for adding nodes.

Filter/Map → Immutable array updates for delete/add operations.

3. Mock Interview Questions & Suggested Answers
Core React Questions

What state are you storing?

File/folder tree, node expansion states, and access token.

Why that state shape?

Tree structure allows recursion; accessToken shape (undefined/null/string) clearly represents loading, logged-out, logged-in states.

How is immutability maintained?

Using spread operator and map/filter for updates ensures the original state isn't mutated.

How does UI update when state changes?

React re-renders components whenever state is updated via setData or setAccessToken.

Time complexity of tree operations?

O(n) where n is number of nodes; recursive traversal for add/delete operations.

JWT Authentication Questions

How does JWT authentication work in this project?

Access token stored in memory; refresh token in HTTP-only cookie. Axios interceptors attach access token to requests. Response interceptor silently refreshes token on 403.

Why store access token in memory instead of localStorage?

Prevents XSS attacks; memory storage disappears on refresh for security.

What is the purpose of useLayoutEffect?

Ensures interceptors exist before components make API calls, avoiding missing Authorization headers.

How do Axios interceptors handle token expiration?

Response interceptor checks for 403; if access token expired, calls /auth/refresh, updates token, retries original request.

What does the _retry flag do?

Prevents infinite loops of failed refresh requests.

What happens if /auth/refresh fails?

setAccessToken(null); user is logged out and UI shows login.

Can this architecture support role-based access?

Yes, by storing roles in the access token or server response, and conditionally rendering components based on roles.

How would you optimize performance for a large tree?

Use React.memo, lazy loading of nodes, virtualization for large folder trees.

What security threats does this architecture mitigate?

Prevents XSS attacks by storing access tokens in memory; refresh token in HTTP-only cookies; reduces risk of infinite requests.

How would you handle multiple API endpoints with different auth requirements?

Use multiple Axios instances or conditional interceptor logic; attach different tokens or roles per endpoint.

File/Folder Explorer Questions

Why recursive rendering?

Simplifies nested folder structures dynamically. Each folder can contain subfolders indefinitely.

How are add/delete operations handled?

Immutable tree updates using map and filter, recursive traversal.

How is node expansion state managed?

isExpanded object keyed by node ID.

How would you improve performance?

Use React.memo for ListObjects; avoid re-rendering unchanged branches; lazy load children; consider virtualization.

4. New Features You Explored

Prompt-based dynamic node addition.

Recursive component design.

JWT-based authentication with Axios interceptors.

React Context for global auth state.

Silent token refresh for seamless UX.

TailwindCSS for quick styling.

5. Challenges Faced

Recursive state updates (immutable tree operations).

Axios interceptor logic with async/await.

Infinite refresh loop prevention (_retry).

Correctly initializing context before app render.

Conditional UI states (undefined/null/string access token).

6. Recommended Improvements

TypeScript for safer prop & token types.

Role-based access.

Error handling UI (toast messages).

Lazy-loading large folder trees.

Unit testing with Jest + React Testing Library.

Dark/light mode toggle.

7. Sample Flashcards
Concept	One-Line Answer
React Context	Global state provider
useLayoutEffect	Run before browser paints
Axios interceptors	Centralized token management
_retry	Prevent infinite refresh loops
Recursive component	Render nested tree dynamically
Access token	Memory storage, short-lived
Refresh token	HTTP-only cookie, long-lived
Immutability	Spread operator, map/filter
Conditional rendering	Loading/Login/Dashboard based on token
TailwindCSS	Utility-first styling
8. Interviewer Expectations

Clear understanding of React fundamentals (hooks, context, recursion).

Correct state management and immutability.

Clean, scalable JS logic for add/delete operations.

Handling edge cases (token expired, tree nodes missing).

Confidence explaining why the solution works, not just what it does.
-------------------------------------------------------------------------------------------------------------------------------------------------------
