✅ Brief Summary

Demonstrates React performance optimization

Prevents unnecessary child re-renders

Uses React.memo, useCallback, and useMemo

Shows how to isolate state updates

🧠 Concept Explanation (Simple)
1️⃣ React.memo

Prevents Child from re-rendering unless props change

Child re-renders only when count or onClick changes

2️⃣ useCallback

Memoizes the handleClick function

Prevents function recreation on every render

Necessary because functions are new references each render

3️⃣ useMemo

Caches expensive calculations

Re-runs only when count changes

Improves performance

4️⃣ State Separation

Updating other does not re-render Child

Shows effective component isolation

🎯 One-Line Interview Answer

This example optimizes performance using React.memo, useCallback, and useMemo to avoid unnecessary re-renders.

🔍 What Happens on Each Click?
Action	Child Re-renders?	Expensive Calc Runs?
Click Child button	✅ Yes	✅ Yes
Click Change other	❌ No	❌ No
🚀 Why This Is React 19+ Ready

Functional components only

Hook-based optimization

Concurrent rendering safe

Production-grade memoization patterns

🧪 Console Output Tip

Click Change other → ❌ no "Child re-rendered"

Click Child → ✅ logs "Child re-rendered"

🧠 Interview Tip

Say this confidently:

“I use memoization to prevent unnecessary renders caused by unchanged props or function references.”

📘 Why this works?

There is a famous formula:

Sum of 0 to (n-1) = n × (n − 1) ÷ 2


So for n = 100000:

100000 × 99999 ÷ 2


That gives the same result without looping 100,000 times 🚀
---------------------------------------------------------------------------------
🔵 3️⃣ What does useMemo do?
const expensive = useMemo(() => expensiveCalculation(count), [count]);


This means:

👉 Run expensiveCalculation(count)
👉 ONLY when count changes
👉 Otherwise reuse the old result.

📘 In simple words:

🧠 “React, don’t recalculate this unless count is different.”
expensiveCalculation → math shortcut to add numbers
• No loop needed
• useMemo → prevents unnecessary recalculation
• Runs only when count changes.
-------------------------------------------------------------------

Version 1 (your code)
const Child = memo(function Child(...) {});

Version 2 (this one)
function Child(...) {}
export default memo(Child);


👉 In both:

• memo() prevents unnecessary re-renders
• Child re-renders only if props change