React JWT Authentication & Dynamic File/Folder Explorer
1. Project Overview
This project is a React 18 application built with Vite. It demonstrates
two practical frontend features:
1. JWT authentication with access tokens, refresh tokens, React
   Context and Axios interceptors.
2. A dynamic file/folder explorer using recursive React components
   and immutable state updates.
The application demonstrates how to manage a user's authentication
session and how to display and update nested file/folder data.
Important scope note: This README is based on the supplied project
documentation. It explains the documented architecture and expected
behavior; adjust file names, endpoints, screenshots and commands if
your actual source code differs.

2. Project Purpose
The purpose is to practise real-world React development:
- Manage authentication state globally.
- Attach access tokens to API requests automatically.
- Refresh expired access tokens without interrupting the user.
- Keep refresh tokens in HTTP-only cookies.
- Render nested folders and files recursively.
- Add and delete nodes without directly mutating React state.
- Build a responsive interface with TailwindCSS.
3. Main Features
Authentication
- JWT-based authentication.
- Short-lived access token held in React memory.
- Refresh token stored in an HTTP-only cookie by the backend.
- Global authentication state through React Context.
- Axios request and response interceptors.
- Silent token refresh and retry of the original request.
- Loading, logged-out and authenticated UI states.
File and Folder Explorer
- Display nested files and folders.
- Expand and collapse folders.
- Add a file or folder.
- Delete a file or folder.
- Render nested data with a recursive component.
- Update the tree immutably using map, filter and the spread
  operator.
4. Technology Stack
  Technology          Purpose
  React 18            Component-based UI
Vite                Development server and build tool
JavaScript ES6+     Application logic
Axios               HTTP requests and interceptors
React Context       Shared authentication state
React Hooks         State, effects and context
TailwindCSS         Responsive styling
JWT                 Token-based authentication
HTTP-only cookies   Protect refresh-token access from JavaScript
HTML5               Semantic page structure
5. Architecture
src/
├── main.jsx                 # App entry point; wraps App with AuthProvider
├── App.jsx                  # Chooses Loading, Login or Dashboard UI
├── api.js                   # Shared Axios instance
├── AuthContext.js           # Creates authentication context
├── AuthProvider.jsx         # Owns auth state and interceptor setup
├── useAuth.js               # Custom hook for reading auth context
└── components/
    └── ListObjects.jsx      # Recursive file/folder renderer
This is a conceptual structure based on the supplied documentation. Your
actual project may use different folders or file names.
Authentication flow
Application starts
      |
      v
AuthProvider checks /auth/me
      |
      v
Access token state is updated
      |
      +---- undefined ---> Loading UI
      |
      +---- null --------> Login UI
      |
      +---- token -------> Dashboard
                              |
                              v
                         API request
                              |
                              v
                    Axios adds Bearer token
                              |
                    Request succeeds?
                       /          \
                     Yes           No (403)
                      |              |
                    Data       Call /auth/refresh
                                     |
                              Refresh succeeds?
                               /          \
                             Yes           No
                              |             |
                        Save new token   Log out
                              |
                       Retry original request
File explorer flow
Tree data
   |
   v
ListObjects component
   |
   v
Check each node's type
   |
   +---- File ------> Render file
   |
   +---- Folder ----> Render folder
                         |
                    Expanded?
                      /   \
                    No     Yes
                    |       |
                  Closed  Render children
                              |
                         ListObjects again
6. Core Concepts in Simple English
  Concept                 Definition              Why it is used
  JWT                     A signed token used to  To authenticate API
represent authenticated requests
claims                  

  Access token            A short-lived token     To access protected
sent with protected     APIs
requests                

  Refresh token           A longer-lived          To maintain a session
credential used to
obtain a new access
token                   

  HTTP-only cookie        A cookie that           To reduce token
JavaScript cannot read  exposure through XSS

  React Context           A way to share values   To avoid passing auth
across a component tree props through many
components

  useState              A Hook for component    To store the access
state                   token and explorer
state

  useEffect             A Hook for              To check the existing
synchronising with      session on startup
external systems        

  useLayoutEffect       An effect that runs     Can install
before the browser      interceptors before the
paints                  UI is painted

  useContext            A Hook for reading      To access shared
context                 authentication state

  Axios interceptor       A function that runs    To centralise token and
before a request or     error handling
after a response        

  Recursion               A function or component To render folders
that calls itself on    inside folders
smaller nested data     

  Immutability            Creating updated data   To make React state
instead of changing     updates predictable
existing data           

  Conditional rendering   Showing UI based on a   To show Loading, Login
condition               or Dashboard
Async/await             Syntax for working with To write readable
Promises                asynchronous API calls
7. Important Code Concepts and Syntax
7.1 React Context
Definition: Context shares data with components without passing
props through every level.
import { createContext } from "react";

export const AuthContext = createContext(null);
Why? Authentication state is needed in different parts of the
application.
7.2 Authentication state with useState
const [accessToken, setAccessToken] = useState(undefined);
The documented state convention is:

  Value         Meaning                        UI
  undefined   Session check is in progress   Loading
null        User is not authenticated      Login
JWT string    User is authenticated          Dashboard

Interview point: These three values represent three different
authentication states. They should not be treated as interchangeable.
7.3 Fetch the current session with useEffect
useEffect(() => {
  fetchMe();
}, []);
Definition: useEffect runs after rendering and is used to
synchronise a component with an external system.

Why? The app checks whether a valid session already exists when it
starts.
7.4 Create an Axios instance
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

export default api;
- axios.create() creates a reusable Axios instance.
- baseURL avoids repeating the API address.
- withCredentials: true allows the browser to include cookies in
  cross-origin requests when the server's CORS and cookie settings
  permit it.
7.5 Request interceptor
api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
Definition: A request interceptor runs before an HTTP request is
sent.

Purpose: It adds the access token automatically, so each protected
API call does not need to add the header manually.

The actual project should connect this logic to the current token and
clean up interceptor registrations when appropriate.
7.6 Response interceptor and token refresh
Conceptual example:
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await api.post("/auth/refresh");
        const newToken = response.data.accessToken;

        setAccessToken(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        setAccessToken(null);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);
This is an illustrative pattern, not a claim that it is an exact copy of
the supplied source code. Match the status code and response shape to
the backend API.

What happens?
1. The API responds with an authentication error.
2. The interceptor checks whether this request has already been
   retried.
3. It calls the refresh endpoint.
4. If refresh succeeds, it saves the new access token.
5. It retries the original request.
6. If refresh fails, it clears authentication state.
Why _retry? It prevents the same request from repeatedly entering
the refresh flow.

Important: A 403 usually means access is forbidden, while 401
usually means authentication is missing or invalid. Use the status code
your backend deliberately returns for expired access tokens. Do not
refresh on every 403, because that can hide genuine permission errors.
7.7 Custom Hook
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useAuth = () => useContext(AuthContext);
Purpose: Provides a simple reusable way to access authentication
context.
7.8 Conditional rendering
if (accessToken === undefined) {
  return <p>Loading...</p>;
}

if (accessToken === null) {
  return <p>Please Login</p>;
}

return <h1>Dashboard - Authenticated</h1>;
Purpose: The UI changes automatically according to authentication
state.
7.9 Recursive component
A recursive component renders a node and, when that node is a folder,
renders its children using the same component.
function ListObjects({ items }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {item.name}

          {item.type === "folder" && (
            <ListObjects items={item.children ?? []} />
          )}
        </li>
      ))}
    </ul>
  );
}
Why recursion? A folder can contain folders, and those folders can
contain more folders. Recursion handles nested levels without writing
separate components for every depth.
7.10 Immutable updates
Add/update: Use map() and the spread operator to create updated
objects and arrays.

Delete: Use filter() to create a new array without the selected
item.
const updatedItems = items.filter((item) => item.id !== deletedId);
For deeply nested trees, the operation must recursively find and update
the correct parent or node.

Why immutability? React can reliably detect state changes when new
objects and arrays are created rather than mutating existing state.
8. UI Explanation for an Interview
The documented UI has three main authentication states:

  State       What the user sees        What it means
  Loading     Loading message           App is checking the existing session
Login       Please Login              No authenticated session is available
Dashboard   Authenticated dashboard   Access token is available

The file explorer UI displays a tree of files and folders. A user can
expand a folder to see its children, add a new node, or delete a node.
Nested folders are displayed by recursively rendering the same
component.

How to explain the UI:

"I designed the UI around the application state. During session
verification, I show a loading screen. If the user is not authenticated,
I show the login screen. After successful authentication, I show the
dashboard. Inside the explorer, folders can be expanded or collapsed,
and users can manage nested files and folders. React state updates keep
the UI in sync with the data."
9. STAR Method -- Project Explanation
S -- Situation

"I wanted to build a React project that demonstrates real-world
authentication and dynamic data handling."

T -- Task

"My task was to manage user sessions securely and build a file explorer
that supports nested folders and files."

A -- Action

"I used React Context to manage authentication globally, Axios
interceptors to attach access tokens and refresh expired tokens, and
recursive components to display nested folders. I used immutable state
updates for adding and deleting nodes."

R -- Result

"The project demonstrates centralised authentication, automatic token
refresh, dynamic nested UI rendering and reusable React components. It
also helped me understand practical React architecture and API
integration."
10. Project Approach -- Step by Step
1. Set up the application: Create the React project using Vite and
   install the required dependencies.
2. Create the API instance: Configure Axios with the backend base
   URL and cookie credentials.
3. Create AuthContext: Define a shared authentication context.
4. Build AuthProvider: Store the access token and check the current
   session.
5. Configure interceptors: Attach tokens to requests and handle
   token refresh.
6. Protect the UI: Display Loading, Login or Dashboard based on
   authentication state.
7. Create tree data: Represent files and folders as nested objects
   and arrays.
8. Build recursive rendering: Render each folder and its children
   using the same component.
9. Implement operations: Add and delete nodes using immutable
   updates.
10. Style and test: Use TailwindCSS and test login, refresh, logout
    and explorer interactions.
11. Why These Technologies? Alternatives
  Used technology         Why it fits             Alternatives
  React Context           Simple global auth      Redux Toolkit, Zustand
state                   

  Axios                   Interceptors and        Fetch API
reusable HTTP client    

  Vite                    Fast React development  Create React App
setup                   (legacy), other build
tools

  TailwindCSS             Utility-first           CSS Modules, plain CSS,
responsive styling      Bootstrap

  Recursive components    Natural fit for nested  Iterative rendering
trees                   with a stack

  JWT                     Stateless token-based   Server-side sessions
API authentication      
HTTP-only cookie        Keeps refresh token     Other carefully
inaccessible to         designed server-managed
JavaScript              session mechanisms
Important interview distinction: Alternatives are not automatically
better or safer. The right choice depends on project size, backend
design and security requirements.
12. Security Best Practices and Important Notes
- Keep short-lived access tokens in memory when using this
  architecture.
- Store refresh tokens in secure, HTTP-only cookies managed by the
  backend.
- Use HTTPS in production.
- Configure cookie attributes such as Secure, HttpOnly and an
  appropriate SameSite policy.
- Protect cookie-based refresh endpoints against CSRF where required.
- Configure CORS with an explicit trusted origin when credentials are
  enabled.
- Validate permissions on the backend. Hiding a UI element is not
  authorization.
- Handle refresh failures and logout consistently.
- Prevent duplicate refresh requests when several API calls fail at
  the same time.
- Eject Axios interceptors during cleanup to avoid registering
  duplicates.
- Do not assume that storing an access token in memory completely
  prevents XSS. XSS can still perform actions through the active
  application session.
13. Common Challenges and Solutions
  Challenge                           Approach
  Checking the session on page load   Call the current-session endpoint

  Different loading and login states  Use undefined, null and token
values consistently

  Repeating token headers in every    Use a request interceptor
API call                            

  Expired access token                Refresh and retry the original
request

  Infinite refresh loop               Use a _retry flag

  Nested folder rendering             Use recursion

  Updating deeply nested data         Use immutable recursive updates
Unnecessary component re-renders    Consider memoisation and rendering
only visible nodes
14. Interview Questions and Answers
Project and architecture
Q1. Tell me about your project.

"My project is a React application that combines JWT authentication with
a dynamic file explorer. I use React Context for global authentication,
Axios interceptors for token handling and recursive components to
display nested folders and files."

Q2. What is the main purpose of this project?

"To demonstrate secure session handling, API integration, reusable
components and dynamic UI management in React."

Q3. Why did you choose React?

"React makes it easier to build reusable components and update the UI
based on state changes."

Q4. Why did you use Vite?

"Vite provides a fast development server and a simple build setup for
React applications."
Authentication
Q5. What is JWT?

"JWT stands for JSON Web Token. It is a signed token used to carry
claims and authenticate requests."

Q6. What is the difference between access and refresh tokens?

"An access token is short-lived and is used to access protected APIs. A
refresh token is used to obtain a new access token."

Q7. Where is the access token stored?

"In React state, which means it is held in application memory."

Q8. Where is the refresh token stored?

"In an HTTP-only cookie managed by the backend."

Q9. Why not store tokens in localStorage?

"JavaScript can read localStorage, so an XSS vulnerability could expose
a token stored there. Memory storage and HTTP-only cookies reduce some
of that exposure."

Q10. What is an Axios interceptor?

"It is a function that runs before a request or after a response. I use
it to attach the access token and handle token refresh centrally."

Q11. What happens when the access token expires?

"The response interceptor requests a new access token using the refresh
cookie. If successful, it updates the token and retries the original
request."

Q12. What is the purpose of _retry?

"It marks a request that has already gone through the refresh attempt,
helping prevent an infinite retry loop."

Q13. What happens if refresh fails?

"The application clears the access token and shows the logged-out UI."

Q14. Why use withCredentials: true?

"It allows the browser to include cookies in eligible cross-origin
requests, provided the server and browser cookie policies permit it."

Q15. Is 403 always a token-expiration error?

"No. A 403 normally means the user is authenticated but does not have
permission. A 401 normally indicates missing or invalid
authentication. The backend should define the refresh behavior clearly."
React concepts
Q16. What is React Context?

"Context allows components to access shared data without passing props
through every component."

Q17. Why use useState?

"To store values that change over time, such as the access token and
expanded folder state."

Q18. What is the difference between useEffect and
useLayoutEffect?

"useEffect runs after the browser paints. useLayoutEffect runs after
DOM changes but before the browser paints. I can use layout effects when
interceptor setup must happen before the UI is painted, although
ordinary effects are preferable when that timing is not required."

Q19. What is a custom Hook?

"A custom Hook is a reusable function that uses React Hooks to share
component logic. In this project, useAuth provides easy access to
authentication context."

Q20. What is conditional rendering?

"Displaying different UI elements depending on a condition, such as
showing Loading, Login or Dashboard."
File explorer
Q21. What is recursion?

"Recursion means a function or component calls itself to solve a smaller
part of a problem. I use it to render folders inside folders."

Q22. Why use recursive components?

"Because the number of nested folder levels is not fixed. The same
component can render every level."

Q23. How do you delete a file or folder?

"I use filter() to create a new array without the selected node,
applying the operation at the correct tree level."

Q24. Why use the spread operator?

"It creates a shallow copy of an object or array, helping me update
state without directly changing the original data."

Q25. What is immutability?

"It means not modifying the original state directly. Instead, I create a
new object or array with the required changes."

Q26. What is the time complexity of a tree traversal?

"For a traversal that visits every node once, the time complexity is
O(n), where n is the number of nodes."
UI and performance
Q27. How does the UI update when state changes?

"When state is updated through a React state setter, React schedules a
re-render and updates the UI where necessary."

Q28. How would you improve a large file explorer?

"I would use React.memo where useful, lazy-load folder contents, and
consider list virtualization for very large folders."

Q29. How would you add role-based access?

"I would obtain roles or permissions from a trusted backend response and
enforce authorization on the backend. The frontend can use those
permissions to control which UI features are visible."

Q30. What would you improve next?

"I would add form validation, better error messages, role-based access,
automated tests, and optimisations for large folder trees."
15. Two-Minute Interview Script
"My project is a React 18 application built using Vite. It demonstrates
JWT authentication and a dynamic file and folder explorer.

For authentication, I use React Context to manage the access token
globally. The access token is stored in React memory, while the refresh
token is stored in an HTTP-only cookie by the backend.

I created a reusable Axios instance and configured interceptors. The
request interceptor automatically attaches the access token to API
requests. If the backend reports an expired or invalid access token
according to its API contract, the response interceptor calls the
refresh endpoint, updates the token and retries the original request.

For the file explorer, I use a nested tree data structure and recursive
React components to display folders and files at different levels. I use
map, filter and the spread operator to update the tree immutably.

The UI uses conditional rendering to show loading, login or dashboard
states. TailwindCSS is used for responsive styling.

Overall, this project helped me understand React Hooks, Context API, JWT
authentication, Axios interceptors, recursion, immutable state updates
and real-world frontend architecture."
16. One-Line Revision Flashcards
  Interview question       Short answer
  What is JWT?             A signed token carrying authentication claims
Access token?            Short-lived token for protected API requests
Refresh token?           Credential used to obtain a new access token
React Context?           Shared state across components
useState?              Stores component state
useEffect?             Synchronises with external systems
useLayoutEffect?       Runs before browser paint
Axios interceptor?       Central request/response handling
_retry?                Helps prevent repeated refresh attempts
Recursion?               A component or function calls itself
Immutability?            Create new state instead of mutating old state
map()?                 Transform array items
filter()?              Select items that match a condition
Spread operator?         Copy and combine arrays or objects
Conditional rendering?   Display UI based on a condition
withCredentials?       Allows eligible cookie credentials on requests
17. Running the Project
Install dependencies:
npm install
Start the backend (according to the supplied project instructions):
npm run server
Start the frontend in a separate terminal:
npm run dev
Open:
http://localhost:5173
The backend is documented as running on port 4000. Ensure the backend
is running and its CORS, cookie and API settings match the frontend
configuration.
18. Future Improvements
- Add a complete login and logout form with validation.
- Add role-based access control.
- Add toast notifications and clear API error states.
- Add automated tests for authentication and tree operations.
- Handle simultaneous token refresh requests.
- Add loading indicators for folder operations.
- Add lazy loading and virtualization for large trees.
- Consider TypeScript for safer data structures and component props.
- Add accessibility support for keyboard navigation and folder
  controls.
19. Final Project Summary
This project demonstrates two important real-world development skills:
- Authentication: React Context + JWT + Axios interceptors +
  refresh cookies.
- Dynamic UI: Recursive components + tree data + immutable state
  updates.
Strong closing interview statement:

"Through this project, I learned how to build a React application that
manages authentication centrally, handles token refresh automatically
and renders dynamic nested data using reusable recursive components. I
focused not only on making the UI work, but also on understanding why
each concept is used and how it fits into a real-world application."
