import React from 'react';

// 👤 UserPanel component
function UserPanel() {

  // 🖥️ UI that will be displayed on screen
  return (
    <h2>User Panel</h2>
  );
}

// 📤 Export this component so it can be used in routing
export default UserPanel;
-----------------------------------------------------------------------------------------------------------------------------------------------
 👤 What is this component?

👉 A simple React component
👉 Displays the User Panel page

⚙️ How it Works
1️⃣ Import React
import React from 'react';

👉 Required to use JSX

2️⃣ Create Component
function UserPanel() {}

👉 Defines a function component

3️⃣ Return UI
return <h2>User Panel</h2>;

👉 Shows text on screen

4️⃣ Export Component
export default UserPanel;

👉 Allows usage in other files

🔄 Flow
Route → UserPanel
        ↓
Component renders
        ↓
Shows "User Panel"
🧠 Real-Life Example
User logs in
   ↓
Opens dashboard
   ↓
Sees "User Panel"
⚡ Important Concepts
✅ 1. Functional Component

👉 A function that returns UI

✅ 2. JSX

👉 HTML-like syntax in React

✅ 3. Export

👉 Makes component reusable

⚠️ Small Improvements
❗ Add user data
return (
  <div>
    <h2>User Panel</h2>
    <p>Welcome User 👋</p>
  </div>
);
❗ Show dynamic user name
const { user } = useAuth();

<p>Welcome {user.name}</p>
❗ Add dashboard content

👉 Orders, profile, settings

🎤 Interview Answer

"This is a simple functional React component that renders the User Panel UI and is used in routing to display content for regular users." 
