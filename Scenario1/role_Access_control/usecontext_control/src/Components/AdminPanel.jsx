import React from 'react';

// 👑 AdminPanel component
function AdminPanel() {

  // 🖥️ UI that will be shown on screen
  return (
    <h2>Admin panel</h2>
  );
}

// 📤 Export component so it can be used in other files
export default AdminPanel;

-----------------------------------------------------------------------------------------------------------------------------------
  👑 What is this component?

👉 A simple React component
👉 Displays Admin Panel UI

⚙️ How it Works
1. Import React
import React from 'react';

👉 Needed to create React components

2. Create Function Component
function AdminPanel() {}

👉 Defines a component

3. Return JSX
return <h2>Admin panel</h2>;

👉 Displays text on screen

4. Export Component
export default AdminPanel;

👉 Allows usage in other files

🔄 Flow
Route → AdminPanel
        ↓
Component renders
        ↓
Shows "Admin panel"
🧠 Real-Life Example
Admin logs into system
   ↓
Opens admin dashboard
   ↓
Sees "Admin Panel"
⚡ Important Concepts
✅ 1. Functional Component

👉 A JavaScript function that returns UI

✅ 2. JSX

👉 HTML-like code inside JavaScript

✅ 3. Export

👉 Makes component reusable

⚠️ Small Improvements
❗ Add more UI
return (
  <div>
    <h2>Admin Panel</h2>
    <p>Welcome Admin 👑</p>
  </div>
);
❗ Add role-based content

👉 Show different data for admin

🎤 Interview Answer

"This is a simple functional React component that renders the Admin Panel UI and is exported for use in routing or other components."
