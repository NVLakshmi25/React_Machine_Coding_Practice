Why use Promise.all with async/await?

Answer:

Promise.all lets multiple API calls run in parallel, and async/await makes the code readable and synchronous-looking while staying non-blocking.

Brief Summary

Fetches multiple APIs in parallel

Uses Promise.all for faster network calls

Handles loading, error, and success states

Prevents state update after unmount

🧠 Concept Explanation
🔹 Parallel Fetching

Promise.all() runs all API calls at the same time

Faster than sequential fetching

🔹 useEffect

Triggers fetch when urls change

Cleanup prevents memory leaks

🔹 Error Handling

Any failed request stops all results

Centralized error message

🔹 Mount Safety

isMounted avoids setting state after unmount

Important for async effects

🎯 1-Line Interview Answer

This component fetches multiple APIs in parallel using Promise.all and safely manages loading and error states.

📊 Behavior Overview
State	UI
Loading	Loading...
Error	Error message
Success	JSON output
No URLs	No data
⚠️ Mistakes Fixed from Original Code

✔ Incorrect string interpolation
✔ Missing async/await clarity
✔ Better variable naming (isMounted)
✔ React 19 import style

⚠️ Important Note About Failure

If any ONE API fails, Promise.all rejects everything:

if (!res.ok) throw new Error(...)


So:

❌ no data shown

❌ error state triggered

❌ loading stops

That is normal Promise.all behaviour.



⚠️ In development only:

React intentionally double-invokes effects to detect side-effects.
🔹 StrictMode note

In development, React StrictMode causes effects to run twice — your hasFetched guard handles this correctly 👍.

In production it runs once.
This happens ONLY in dev mode.
✔️ Double calls caused by React StrictMode
✔️ Happens only in dev
✔️ Production = once