import React from 'react';

// 🚫 Unauthorized Page Component
export default function Unauthorized() {

  // 🖥️ UI shown when user is not allowed to access a page
  return (
    <h2>403 — Unauthorized</h2>
  );
}
-------------------------------------------------------------------------------------------------------------------------------------
  🧠 Simple Explanation
🚫 What is this component?

👉 It shows a message when a user does not have permission

⚙️ When is it used?

👉 When:

User is logged in ✅
But tries to access restricted page ❌

Example:

User role = "user"
Trying to open admin page
→ Show Unauthorized page
🔢 What is 403?

👉 HTTP Status Code

403 = Forbidden / Unauthorized access

👉 Means:

"You are logged in, but you are NOT allowed here"

🔄 Flow
User tries restricted page
        ↓
RoleGuard checks role
        ↓
Not allowed
        ↓
Redirect to Unauthorized page
        ↓
Show: 403 — Unauthorized
🧠 Real-Life Example
You enter office
   ↓
Try to access Admin room
   ↓
Security says:
"You're not allowed here"
⚡ Important Concepts
✅ 1. Authorization

👉 Controls what you can access

✅ 2. Error Page

👉 Displays access denied message

✅ 3. Role-Based Routing

👉 Used with RoleGuard

⚠️ Small Improvements
❗ Add better UI
return (
  <div>
    <h2>403 — Unauthorized</h2>
    <p>You don't have permission to access this page.</p>
  </div>
);
❗ Add "Go Back" button
<button onClick={() => navigate("/")}>
  Go Home
</button>
❗ Add styling

👉 Make it user-friendly

🎤 Interview Answer

"This is a simple React component used to display a 403 Unauthorized message when a user tries to access a route they are not permitted to access."
