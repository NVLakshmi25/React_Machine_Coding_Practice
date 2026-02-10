📌 Parallel Fetches in React (Promise.all + AbortController)

A small React project built with Vite + React + TailwindCSS + DaisyUI that demonstrates how to fetch multiple APIs in parallel using Promise.all with proper loading/error handling and safe cleanup using AbortController.

🚀 Features

✅ Fetch multiple APIs in parallel (faster than sequential calls)
✅ Uses Promise.all for parallel network requests
✅ Uses async/await for clean readable code
✅ Handles Loading / Error / Success / No data UI states
✅ Cancels pending requests using AbortController
✅ Prevents duplicate fetch in React StrictMode using useRef guard
✅ Styled using TailwindCSS + DaisyUI
✅ Clean and scalable component structure

🛠 Tech Stack

⚛️ React (Hooks based)

⚡ Vite

🎨 TailwindCSS

🌼 DaisyUI

🌐 Fetch API

🧠 JavaScript (ES6+)

📂 Project Structure
src/
 ├── Components/
 │    └── ParallelFetches.jsx
 ├── App.jsx
 ├── App.css
 └── main.jsx
vite.config.js

📌 Component Explanation (ParallelFetches.jsx)
🔹 Purpose

The ParallelFetches component fetches multiple API URLs at the same time and displays the results in JSON format.

🔹 Props Used
<ParallelFetches urls={[url1, url2, url3]} />


urls → Array of API endpoints

🧠 Core Concepts Used
✅ 1. useEffect (Side Effects)

Runs API fetching logic when urls changes.

useEffect(() => {
  fetchAll();
}, [urls]);

✅ 2. Promise.all (Parallel Fetching)
const results = await Promise.all(
  urls.map(async (url) => fetch(url))
);


📌 Why Promise.all?

Runs all API calls simultaneously

Faster than sequential calls

Returns array of results in same order

⚠️ Note: If one request fails, Promise.all fails completely.

✅ 3. async/await (Readable Asynchronous Code)

Makes asynchronous code look synchronous but still non-blocking.

✅ 4. AbortController (Cancel API Calls)

Prevents memory leaks when component unmounts.

const controller = new AbortController();
fetch(url, { signal: controller.signal });

return () => controller.abort();

✅ 5. useRef Guard (StrictMode Double Fetch Fix)

React StrictMode runs effects twice in development.
This guard prevents duplicate fetch.

const hasFetched = useRef(false);

if (hasFetched.current) return;
hasFetched.current = true;

✅ 6. Conditional Rendering

UI changes based on loading/error/data states.

if (loading) return <div>Loading...</div>;
if (error) return <div>Error</div>;
if (!data) return <div>No data</div>;

📊 UI Behavior Table
State	UI Output
Loading	Loading...
Error	Error: message
Success	JSON output in <pre>
No URLs	No data
🎯 Example API Used
urls={[
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/users/1",
]}

📌 Output Example

When successful, output will look like:

[
  {
    "userId": 1,
    "id": 1,
    "title": "....",
    "body": "...."
  },
  {
    "id": 1,
    "name": "Leanne Graham",
    "username": "Bret"
  }
]

🎨 Styling (TailwindCSS + DaisyUI)
App.css contains utility classes:
.api-box {
  @apply bg-white p-4 rounded-lg shadow-md text-sm overflow-auto;
}

.api-error {
  @apply text-red-600 font-medium text-xl;
}

.api-loading {
  @apply text-gray-600 font-medium text-xl;
}

⚙️ Installation & Setup
1️⃣ Clone Repository
git clone <your-repo-url>
cd your-project

2️⃣ Install Dependencies
npm install

3️⃣ Run Development Server
npm run dev

🏗 Build for Production
npm run build

🔍 Why this project is important (Interview Point)

This project demonstrates:

Efficient API fetching strategy

React hook usage (useEffect, useState, useRef)

Parallel network requests

Cleanup patterns to avoid memory leaks

Strong error and loading handling

Modern React coding style

🎤 1-Minute Interview Explanation (Ready Answer)

"This project is a React component that fetches multiple APIs in parallel using Promise.all for faster execution.
I used useEffect to trigger the fetch when URLs change and useState to manage loading, error, and response data.
To avoid memory leaks, I implemented AbortController cleanup to cancel pending requests when the component unmounts.
Since React StrictMode runs effects twice in development, I used a useRef guard to prevent duplicate API calls.
Finally, I used conditional rendering to display loading, error, or JSON results cleanly."

❓ Common Interview Questions
✅ Why Promise.all?

Because it runs multiple requests in parallel and reduces total waiting time.

✅ What happens if one API fails?

Promise.all rejects completely, so error state triggers and no partial data is shown.

✅ Why AbortController?

To cancel ongoing requests and avoid updating state after unmount.

✅ Why useRef?

To store mutable values without causing re-render and prevent duplicate fetch calls in dev StrictMode.

🚀 Future Improvements (Features to Add)

✅ Use Promise.allSettled() for partial success handling
✅ Add retry logic for failed APIs
✅ Add caching layer (Map object)
✅ Add pagination support
✅ Add custom hook useParallelFetch()
✅ Add UI cards instead of JSON view
✅ Add error boundary for better fallback UI
✅ Add React Query integration (industry standard)

⭐ Key Learnings

Parallel fetching is faster than sequential fetching

Cleanup in useEffect prevents memory leaks

StrictMode runs effects twice in development

useRef is useful for guarding side effects

Promise.all fails completely if one promise fails

📌 Conclusion

This project is a clean example of modern React API handling with:

parallel execution

safe cleanup

strong error handling

optimized effect behavior.
------------------------------------------------------------------------------------------------------------------------------------------------------------
✅ 1) Project Architecture (High-Level)
📌 Project Name

ParallelFetches Component

📌 Goal

Fetch multiple API endpoints at the same time and display results.

📌 Why this architecture?

Because real applications often need:

Profile API + Orders API

Product API + Reviews API

Dashboard widgets APIs

Instead of fetching one-by-one, we fetch in parallel for better performance.

✅ 2) Core JavaScript Concepts Used (Separated)
🔹 1. Async/Await
Definition

async/await is a syntax to handle promises in a readable way.

Purpose

Avoid .then() chaining and write code like synchronous style.

Example
const res = await fetch(url);
const data = await res.json();

🔹 2. Promise.all()
Definition

Promise.all() runs multiple promises in parallel and returns results together.

Purpose

To fetch multiple APIs faster.

Syntax
Promise.all([promise1, promise2])

In your code
const results = await Promise.all(
  urls.map(async (url) => { ... })
);

Behavior

If all APIs succeed → returns array of results

If any API fails → Promise.all rejects immediately

🔹 3. Array.map()
Definition

map() transforms each element of array into a new array.

Purpose

To create multiple fetch promises.

urls.map((url) => fetch(url))

🔹 4. Error Handling (try/catch/finally)
Purpose

To safely handle API failure.

try { }
catch(err) { }
finally { }

🔹 5. AbortController
Definition

AbortController is a browser API to cancel a fetch request.

Syntax
const controller = new AbortController();
fetch(url, { signal: controller.signal });
controller.abort();

✅ 3) Core React Concepts Used (Separated)
🔹 1. useState
Definition

Hook to store component state.

In your code
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

Why these states?

Because every API UI needs:

loading → show spinner

data → show results

error → show error message

🔹 2. useEffect
Definition

Runs side effects like API calls after rendering.

In your code
useEffect(() => {
  fetchAll();
}, [urls]);

Why dependency [urls]?

Because whenever urls changes, you want to fetch again.

🔹 3. useRef
Definition

Stores a mutable value that does not cause re-render.

In your code
const hasFetched = useRef(false);

Why used here?

Because in React StrictMode, useEffect runs twice in development.
So this prevents duplicate fetch calls.

🔹 4. Conditional Rendering
Definition

Render different UI based on state.

if (loading) return <div>Loading...</div>;
if (error) return <div>Error</div>;
if (!data) return <div>No data</div>;

✅ 4) Code Logic Step-by-Step (Line-by-Line Explanation)
✅ Step 1: Receive urls
const ParallelFetches = ({ urls = [] }) => {


Component accepts urls prop

Default value is empty array

✅ Step 2: Create state variables
const [data, setData] = useState(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);


data holds API response array

loading controls UI loader

error holds error message

✅ Step 3: StrictMode guard
const hasFetched = useRef(false);


React StrictMode runs effects twice in development.

So we store a flag to avoid duplicate API calls.

✅ Step 4: useEffect triggers fetching
useEffect(() => {
  if (!urls.length) return;


If urls array is empty → skip fetch.

✅ Step 5: Reset guard when urls changes
hasFetched.current = false;


When urls changes, we allow fetching again.

✅ Step 6: Create AbortController
const controller = new AbortController();
const { signal } = controller;


This helps cancel requests if component unmounts.

✅ Step 7: Create fetchAll function
const fetchAll = async () => {


Inside it we call multiple fetches.

✅ Step 8: Prevent duplicate calls
if (hasFetched.current) return;
hasFetched.current = true;

✅ Step 9: Start loading
setLoading(true);
setError(null);


Reset error when new request begins.

✅ Step 10: Parallel requests using Promise.all
const results = await Promise.all(
  urls.map(async (url) => {


Each URL is fetched simultaneously.

✅ Step 11: Fetch and validate response
const res = await fetch(url, { signal });

if (!res.ok) {
  throw new Error(`Failed ${res.url} ${res.status}`);
}


If response is not 200-level, throw error.

✅ Step 12: Convert to JSON
return await res.json();

✅ Step 13: Store final results
setData(results);


results is an array of JSON objects.

✅ Step 14: Handle errors
catch (err) {
  if (err.name !== "AbortError") {
    setError(err.message);
  }
}


Abort error is ignored because it happens during cleanup.

✅ Step 15: Stop loading always
finally {
  setLoading(false);
}

✅ Step 16: Cleanup function
return () => {
  controller.abort();
};


When component unmounts or re-renders → abort all fetches.

✅ 5) Output Behavior (UI Flow)
Case 1: When App loads

loading = false

data = null

error = null
UI shows:
👉 No data

Then useEffect runs → loading becomes true.

Case 2: While fetching

UI shows:
👉 Loading...

Case 3: Success

data becomes array of results
UI shows:
👉 JSON printed inside <pre>

Case 4: If any API fails

error becomes message
UI shows:
👉 Error: Failed ...

Case 5: Component unmounts during request

AbortController cancels request
No error shown.

✅ 6) Why This Code is Good for Interviews

Because it shows you understand:

✅ Parallel API optimization
✅ React StrictMode behavior
✅ Cleanup to avoid memory leaks
✅ Proper loading/error state management
✅ Async/await with try-catch-finally
✅ Production-style architecture

⚡ 7) Performance Improvements (Important Interview Part)
🔥 Improvement 1: Use Promise.allSettled()

Problem: Promise.all fails if ONE API fails.

Solution: Allow partial success.

const results = await Promise.allSettled(
  urls.map((url) => fetch(url, { signal }).then(r => r.json()))
);

🔥 Improvement 2: Cache results

If same URL is requested again, avoid re-fetch.

Use Map:

const cache = useRef(new Map());

🔥 Improvement 3: Add retry logic

If API fails due to network error, retry 2 times.

🔥 Improvement 4: Add timeout

Abort if request takes too long.

🔥 Improvement 5: Use React Query / TanStack Query (Industry Standard)

It gives caching, retries, background updates automatically.

Interviewers love this.

✅ 8) Latest React 18+ Best Version Code (Improved)
✅ Updated Component (Production Style)
import React, { useEffect, useRef, useState } from "react";

export default function ParallelFetches({ urls = [] }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hasFetched = useRef(false);

  useEffect(() => {
    if (!urls.length) return;

    hasFetched.current = false;
    const controller = new AbortController();

    async function fetchAll() {
      if (hasFetched.current) return;
      hasFetched.current = true;

      setLoading(true);
      setError("");

      try {
        const results = await Promise.all(
          urls.map(async (url) => {
            const res = await fetch(url, { signal: controller.signal });

            if (!res.ok) {
              throw new Error(`Request failed: ${res.status}`);
            }

            return res.json();
          })
        );

        setData(results);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchAll();

    return () => controller.abort();
  }, [urls]);

  if (loading) return <p className="api-loading">Loading...</p>;
  if (error) return <p className="api-error">Error: {error}</p>;
  if (!data.length) return <p>No data</p>;

  return (
    <pre className="api-box">
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}


✅ Improvements:

data is array instead of null

better default values

safer UI condition (data.length)

🎤 9) 2-Minute Spoken Interview Script (Recruiter Ready)

**"This project is a React component called ParallelFetches that fetches multiple API endpoints simultaneously.
I pass an array of URLs as a prop, and I use useEffect to trigger the fetch operation whenever the URLs change.
To handle UI states, I use useState to store data, loading, and error values.

For performance, I use Promise.all so that all API calls run in parallel instead of sequentially, which reduces total waiting time.
Each request is handled with async/await, and I validate the response using res.ok. If any request fails, I throw an error and show it in the UI.

To avoid memory leaks and state updates after unmount, I use AbortController in the cleanup function, which cancels pending requests.
Also, because React StrictMode runs effects twice in development, I use a useRef flag to prevent duplicate API calls.

Finally, I use conditional rendering to display Loading, Error, No Data, or Success JSON output.
This architecture is scalable for dashboards where multiple API calls are required in parallel."**

⚡ 10) 1-Minute Elevator Pitch

"This project demonstrates parallel API fetching in React using Promise.all and async/await. I used useEffect to trigger the requests and useState to manage loading, error, and response data. I added AbortController cleanup to prevent memory leaks, and I used a useRef guard to avoid duplicate API calls in StrictMode. It’s a production-style solution for dashboard data fetching."

🧠 11) Flashcards (Fast Recall)
Flashcard 1

Q: Why use Promise.all?
A: To fetch multiple APIs in parallel for better performance.

Flashcard 2

Q: What does AbortController do?
A: Cancels fetch requests during cleanup.

Flashcard 3

Q: Why useRef here?
A: Prevents double fetch in React StrictMode dev mode.

Flashcard 4

Q: Why useEffect?
A: To run API call side-effect after render.

Flashcard 5

Q: What happens if one API fails in Promise.all?
A: Entire Promise.all rejects.

🎯 12) Ultra-Short 1-Line Answers

useEffect → Runs API calls after render.

Promise.all → Executes multiple promises in parallel.

AbortController → Cancels pending requests to avoid leaks.

useRef → Stores mutable value without re-render.

loading state → Controls spinner UI.

error state → Displays API failure message.

data state → Stores successful API results.

📋 13) Mock Interview Q&A (Basic → Senior)
✅ Basic Level Questions
Q1: Why use useEffect for API call?

A: Because API calls are side effects and should run after component render.

Q2: Why use loading state?

A: To show user feedback while request is in progress.

Q3: Why return JSON.stringify inside pre tag?

A: <pre> keeps JSON formatting readable.

Q4: What is conditional rendering?

A: Rendering different UI based on state like loading/error/data.

✅ Mid-Level Questions
Q5: Why use Promise.all?

A: It reduces total time by fetching all URLs in parallel.

Q6: Why use AbortController?

A: To cancel requests and prevent state update after unmount.

Q7: Why check res.ok?

A: Because fetch doesn’t throw error automatically for 404/500.

Q8: Why use try/catch/finally?

A: To handle success, failure, and ensure loading state resets.

Q9: Why use useRef instead of useState for hasFetched?

A: Because useRef doesn't cause re-render and stores stable value.

✅ Senior Level Questions
Q10: What problem does StrictMode create?

A: It runs useEffect twice in dev, causing duplicate API calls.

Q11: How to handle partial failures?

A: Use Promise.allSettled() to show partial data.

Q12: How do you optimize repeated calls?

A: Add caching with Map or use React Query.

Q13: What is time complexity here?

A:

map is O(n) for n URLs

Total network time is max(responseTime) instead of sum(responseTime)

Q14: What race condition can happen?

A: Old API response can override new response if urls change quickly.

Fix: abort previous requests.

Q15: How to avoid unnecessary fetches?

A: Memoize urls array using useMemo or keep urls stable.

✅ 14) What Interviewers Expect (Your Answer)

"Interviewers expect me to explain what state I store, why I used Promise.all, how I prevent memory leaks using AbortController cleanup, and how I handle StrictMode double execution using useRef. They also expect proper error handling and scalable architecture."

🚀 15) New Features You Can Add (Project Improvements)

✅ Add Promise.allSettled() for partial success
✅ Add Retry logic (2 retries)
✅ Add caching (Map)
✅ Add timeout feature (abort after 5 sec)
✅ Add UI cards instead of raw JSON
✅ Add search/filter results
✅ Add pagination
✅ Add custom hook useParallelFetch()
✅ Add React Query (production best practice)

🧩 16) Challenges / Debugging Issues (Interview Experience Answer)
Common issues you can mention:

✅ StrictMode double fetch bug
✅ Fetch failing silently without res.ok check
✅ Memory leak warning if component unmounts before response
✅ Promise.all rejecting everything if one API fails
✅ Need for cleanup function

🏁 Final Summary (Quick)
This project teaches:

Parallel API fetching (Promise.all)

Async/await handling

React state management

useEffect cleanup

AbortController cancellation

StrictMode double-run fix with useRef

Conditional UI rendering

Real-world scalable API architecture.
---------------------------------------------------------------------------------------------------------------------------------------------------------------
✅ 1) How to Explain This Project in Interviews (Perfect Structure)
⭐ Interview Explanation Template (Use This Every Time)

1. What problem I solved

I built a reusable component that fetches multiple APIs in parallel and displays combined results.

2. What state I store

data → stores API results array

loading → handles spinner UI

error → stores failure message

3. Why that state shape

I used separate states because API flow always has 3 phases: loading, success, failure.

4. How UI updates happen

React re-renders automatically whenever state changes using setState.

5. How I prevent bugs

StrictMode double fetch solved using useRef

Memory leak solved using AbortController

6. Complexity

O(n) fetch calls, total time depends on slowest API.

✅ 2) Frequently Asked Interview Questions & Answers (Basic Level)
Q1) What does this project do?

✅ Answer

This project fetches multiple APIs in parallel using Promise.all() and displays the combined JSON output with proper loading and error handling.

Q2) Why did you use useEffect?

✅ Answer

Because API calls are side effects. useEffect runs after the component renders and is the correct place for fetching data.

Q3) Why did you use useState?

✅ Answer

To store API results, loading status, and error messages so the UI can update automatically when values change.

Q4) Why do you have loading state?

✅ Answer

To provide user feedback while the API request is still in progress.

Q5) Why do you check res.ok?

✅ Answer

Because fetch does not throw an error automatically for 404/500 responses. So I manually validate response status.

Q6) What is conditional rendering?

✅ Answer

It means rendering different UI based on conditions like loading, error, or data state.

✅ 3) Core React Concepts Questions (Mid-Level)
Q7) What state are you storing and why?

✅ Answer

I store data, loading, and error. This state structure matches the API lifecycle: request started, request success, request failed.

Q8) Why did you set data initial value as null?

✅ Answer

Because initially no API data exists, so null represents "not fetched yet". After success it becomes an array of results.

(Improvement: you can use [] also.)

Q9) How does UI update when API finishes?

✅ Answer

When setData(results) is called, React triggers a re-render and updates UI to display the JSON output.

Q10) What is the dependency array [urls] doing?

✅ Answer

It ensures the effect runs only when the urls prop changes. That avoids unnecessary API calls.

Q11) Why is cleanup important in useEffect?

✅ Answer

Cleanup prevents memory leaks and prevents updating state when component unmounts before the API finishes.

✅ 4) StrictMode & useRef Questions (Important!)
Q12) Why did you use useRef in this project?

✅ Answer

React StrictMode runs useEffect twice in development to detect side-effect issues. I used useRef as a guard flag to avoid duplicate API calls.

Q13) Why not use useState instead of useRef for hasFetched?

✅ Answer

Because useState triggers re-renders. But useRef updates do not cause re-render, so it’s more efficient for storing flags.

Q14) Does this StrictMode double fetch happen in production?

✅ Answer

No, StrictMode double execution is only in development. Production runs useEffect normally once.

✅ 5) JavaScript Core Concepts Questions
Q15) Why use Promise.all()?

✅ Answer

Promise.all runs multiple promises in parallel, so total fetch time becomes faster compared to sequential calls.

Q16) What happens if one API fails in Promise.all?

✅ Answer

Promise.all rejects immediately, and the entire operation fails even if other APIs succeed.

Q17) How can you handle partial success?

✅ Answer

Use Promise.allSettled() so even if one API fails, we can still show successful results.

Q18) Why use try/catch/finally?

✅ Answer

try handles success, catch handles errors, and finally ensures loading state resets in both success and failure cases.

✅ 6) Immutability Questions (Very Important)
Q19) How is immutability maintained in this project?

✅ Answer

I never directly modify the state variable. Instead I use setData(results) which replaces state with a new array object.

Q20) Why is immutability important in React?

✅ Answer

React detects state updates using reference changes. Mutating existing objects may not trigger re-render and can cause bugs.

✅ 7) Edge Case / Real-World Handling Questions
Q21) What if urls array is empty?

✅ Answer

I return early using if (!urls.length) return; to avoid unnecessary effect execution.

Q22) What if component unmounts before API completes?

✅ Answer

Cleanup aborts the request using AbortController, preventing memory leaks and state update warnings.

Q23) What if user changes urls quickly?

✅ Answer

The previous effect cleanup aborts old requests, and new fetch starts for updated urls.

✅ 8) Time Complexity Questions (Basic → Advanced)
Q24) What is the time complexity of this project?

✅ Answer

Time complexity is O(n) because we perform one fetch call per URL.

Q25) What is the actual execution time?

✅ Answer

Because calls are parallel, total time depends on the slowest API response, not sum of all response times.

Q26) Space complexity?

✅ Answer

Space complexity is also O(n) because results array stores n responses.

Q27) Why parallel fetch is better than sequential?

✅ Answer

Sequential would take time like T1+T2+T3. Parallel takes max(T1,T2,T3), which is faster.

✅ 9) Performance & Optimization Questions (Senior Level)
Q28) How do you improve performance in this project?

✅ Answer

I can improve by caching results, avoiding unnecessary re-fetching, using Promise.allSettled for partial success, and using React Query for caching and retries.

Q29) What is the main performance advantage of this code?

✅ Answer

Parallel API calls reduce total wait time significantly compared to sequential fetching.

Q30) What improvements can be done for large number of URLs?

✅ Answer

Use concurrency limiting (batch requests), pagination, or throttling instead of firing 100 requests at once.

Q31) Why React Query is better than manual fetch?

✅ Answer

React Query provides caching, retries, stale-while-revalidate, background refetch, and avoids duplicate network calls.

✅ 10) Advanced Debugging / Challenges Questions
Q32) What debugging issues did you face?

✅ Answer

In StrictMode I noticed API calls happening twice. I fixed it using a useRef guard to prevent duplicate fetch.

Q33) What warning does React show if cleanup is missing?

✅ Answer

"Can't perform a React state update on an unmounted component."

Q34) Why is AbortController important?

✅ Answer

It cancels pending fetches and prevents memory leaks, especially in fast navigation apps.

✅ 11) Requirements & Domain Questions
Q35) What type of real-world domain uses this?

✅ Answer

Dashboards, e-commerce apps, admin panels, social apps, and analytics platforms where multiple APIs must load together.

Q36) What are the project requirements?

✅ Answer

Fetch multiple APIs

Show loading UI

Show error UI

Display output properly

Prevent memory leaks

Handle StrictMode double-fetch

✅ 12) What Interviewers Expect From You (Strong Answer)
Q37) What do interviewers evaluate in this project?

✅ Answer

They check if I understand useEffect behavior, state management, async JavaScript, cleanup logic, StrictMode, error handling, scalability, and performance optimization.

✅ 13) New Features You Can Add (Very Interview-Strong)
Q38) What new features can you add?

✅ Answer

Add retry mechanism (2 retries)

Add timeout handling

Add Promise.allSettled support

Add caching using Map

Add UI cards for each API result

Add skeleton loader

Add pagination

Convert into custom hook useParallelFetch

Add search/filter in results

Add React Query integration

✅ 14) What You Learned From This Project (Perfect Interview Answer)
Q39) What did you learn?

✅ Answer

I learned parallel API fetching, proper state handling for API lifecycle, cleanup with AbortController, StrictMode behavior, and how React re-render works based on state updates.

✅ 15) Mid-Level Mock Interview Q&A (Common)
Q40) Why did you return early if no urls?

✅ Answer

To prevent unnecessary side effects and avoid wasted renders.

Q41) Why did you store error as string?

✅ Answer

Because UI needs a readable message. It’s easier to display and debug.

Q42) What if API returns huge data?

✅ Answer

I would paginate, lazy load, or limit results and avoid rendering huge JSON directly.

✅ 16) Senior-Level Mock Interview Q&A (High Value)
Q43) What are race conditions in fetch?

✅ Answer

If multiple requests run, an older response might overwrite newer state. AbortController prevents that.

Q44) Why might [urls] cause repeated fetches unnecessarily?

✅ Answer

If parent passes a new array reference each render, effect will run again. Fix: memoize urls with useMemo.

Q45) How would you make this scalable?

✅ Answer

Create a reusable hook, add caching, error boundary support, and use TanStack Query.

Q46) What is the best way to manage API fetching in enterprise React?

✅ Answer

Use TanStack Query because it standardizes caching, retries, invalidation, and avoids manual boilerplate.

✅ 17) Best Interview Answer: “Explain Your Code”
🔥 Final Perfect Explanation (Recruiter Ready)

I created a reusable React component that fetches multiple API endpoints in parallel.
I used useState to store loading, error, and response data because API fetching naturally has these states.
I used useEffect to trigger fetch when urls change, and I used Promise.all to optimize performance by fetching concurrently.
I added res.ok validation because fetch doesn’t throw errors automatically for 404 or 500.
I used AbortController in the cleanup function to cancel pending requests and prevent memory leaks.
Also, since StrictMode runs effects twice in development, I used a useRef guard to avoid duplicate fetch calls.
Finally, I used conditional rendering to show loading UI, error UI, or results UI based on the current state.

⚡ Ultra-Short Answers (One Line Only)

useEffect → Used for API side effects after render.

Promise.all → Fetches multiple APIs in parallel.

useRef → Prevents StrictMode double fetching.

AbortController → Cancels fetch to avoid memory leaks.

res.ok → Validates response success.

loading state → Controls loader UI.

error state → Displays failure message.

data state → Stores API output results.

Complexity → O(n) requests, time depends on slowest API.

✅ Final Interview Takeaway (What You Should Say)
⭐ What You Built

Parallel API Fetch Component

⭐ Skills You Proved

React Hooks + Async JS + Cleanup + StrictMode + Performance Optimization

⭐ What Makes It Production Ready

AbortController + Error handling + Parallel execution + UI lifecycle states.
