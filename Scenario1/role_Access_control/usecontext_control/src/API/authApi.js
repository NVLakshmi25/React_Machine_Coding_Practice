// 🌐 Fake login API function
export async function loginApi(role) {

  // ⏳ Simulate API delay (like server response time)
  await new Promise((r) => setTimeout(r, 500));
  // 👉 waits for 500 milliseconds (0.5 seconds)


  // ✅ Return fake response (like backend response)
  return {

    // 🔐 Fake JWT token
    token: "jwt-token-123",

    // 👤 User data
    user: {
      name: "John", // fixed name
      role,         // dynamic role passed as argument
    },
  };
}
------------------------------------------------------------------------------------------------------------------------
  🧠 Simple Explanation
🎯 What is this function?

👉 It is a fake API (mock API)
👉 Used for testing login without backend

⚙️ How it Works
⏳ Step 1: Wait (simulate API)
await new Promise((r) => setTimeout(r, 500));

👉 Pretends to call server
👉 Adds delay (0.5 seconds)

🔐 Step 2: Return Data
return {
  token: "...",
  user: {...}
}

👉 Sends login response

🔄 Flow
Call loginApi("admin")
        ↓
Wait 500ms
        ↓
Return:
{
  token: "jwt-token-123",
  user: { name: "John", role: "admin" }
}
🧠 Real-Life Example
You click login
   ↓
System talks to server
   ↓
Server sends:
   - token (your ID)
   - user info
⚡ Important Concepts
✅ 1. async/await

👉 Handles asynchronous code

✅ 2. Promise
new Promise((resolve) => setTimeout(resolve, 500))

👉 Waits before continuing

✅ 3. Mock API

👉 Fake backend for testing

✅ 4. Dynamic Role
role

👉 Value comes from argument

🧪 Example Usage
const res = await loginApi("admin");

console.log(res.user.role); // "admin"
⚠️ Important Note

👉 This is NOT real authentication
👉 No password check ❌
👉 No database ❌

🎤 Interview Answer

"This is a mock asynchronous login API that simulates a backend response using a Promise delay and returns a fake JWT token along with user data including role."
