✅ Why this fixes it(main.jsx)

👉 Context provider must wrap the app
👉 Otherwise useAuth() returns null
👉 App cannot read token
👉 Page stuck / blank

🧠 Telugu explanation:

👉 ERR_CONNECTION_REFUSED ante
👉 Browser backend ni connect cheyalekapoyindi
👉 Port 4000 lo server ledu

👉 First backend run cheyyali
👉 App side error kaadu

🎯 Quick Interview-style answer:

Q: What does ERR_CONNECTION_REFUSED mean?

👉 Client tried to reach server but server is down or wrong port.

-------------------------------------------------------------------------
What is Authentication?

Definition:
Authentication is the process of verifying who the user is before allowing access to protected resources.

In React apps:

User ➝ React App ➝ Server ➝ Response ➝ UI Update

Server checks:

• Is user logged in?
• Does user have permission?
• Is token valid?
-------------------
🪙 JWT (JSON Web Token)

Definition:
JWT is an encrypted token that stores user identity data and expiry time.

Used to:

✔ Identify user
✔ Secure requests
✔ Control sessions
✔ Expire login automatically
---------------------------------------
🎯 Access Token vs Refresh Token
Token	Stored Where	Lifetime	Purpose
Access Token	React State (Memory)	Short (15 min)	Sent with every request
Refresh Token	HTTP-Only Cookie (Server)	Long (30 days)	Generate new access token
👉 In React state (memory).
👉 HTTP-only secure cookie on server. 👉 JavaScript cannot access it — prevents token theft.
-----------------------------------
🧠 WHY TWO TOKENS?
👉 To keep security high while avoiding frequent logouts.

👉 Security + User Experience

If only one token existed:

• When it expires → logout → bad UX

So:

Access expires fast ➝ Server checks refresh ➝ creates new access ➝ user continues
👉 Server checks refresh token and returns a new access token.

❓ Why access token short lived?

👉 Reduces damage if compromised.

Q: Why refresh tokens server-side?
👉 Security + session continuity.

Q: Why use axios interceptors?
👉 Centralized request handling.

Q: What problem does this solve?
👉 Silent token renewal.

Q: How logout works?
👉 setAccessToken(null).
------------------------------------------------------------------------------
🚫 WHY NOT LOCAL STORAGE?

Because:

❌ JS can read it
❌ Vulnerable to XSS
❌ Hackers can steal token
👉 Memory storage avoids XSS attacks.
------------------------
✅ BEST PRACTICE

Store:

• Access token → React state (memory)
• Refresh token → HTTP-only cookie
-------------------------------
Front: Access Token
Back: JWT used in API calls, stored in memory.
Front: Refresh Token
Back: Long-lived token stored in HTTP-only cookie.
Front: XSS Risk
Back: Why not store tokens in localStorage.
-------------------------------------------------
🟢 “Server generates refresh token and stores in HTTP-only cookie”

➡ Means only backend can read/write it — safe from JS attacks.

🟢 “React stores access token in memory”

➡ Stored in state, not persisted — disappears on refresh.

🟢 “Access token expires in 15 minutes”

➡ Limits exposure window if hacked.

🟢 “Refresh token expires in 30 days”

➡ Allows long login sessions.
❌ Without Refresh Token:

Access expires ➝ User logged out ➝ Login again

✅ With Refresh Token:

Access expires ➝ Server renews ➝ User continues

--------------------------------

“In React apps, authentication uses JWT access and refresh tokens.
The server stores the refresh token in an HTTP-only cookie blocks JS access and sends a short-lived access token, React stores the  access token in memory to the client.
React keeps the access token only in memory and attaches it to API requests.
When it expires, the server validates the refresh token  ,Refresh token regenerates access and issues a new access token, preventing frequent logouts, Memory storage reduces XSS, Improves security + UX.
-------------------------------
“In React I store access tokens in memory, not localStorage.(Vulnerable to XSS attacks.)
Axios interceptors attach tokens to requests and refresh them ( stored Server cookie.)automatically using an HTTP-only refresh token cookie(JS cannot read them.).(✔ Silent refresh improves UX)
When the backend returns 403(Try refresh token.), the interceptor calls a refresh endpoint, updates state, retries the request(avoids infinite calls, loop protection ), and the user never notices.
If refresh fails, the app logs out.”
➡ set token = null
➡ app shows login

❌ Without Interceptors:

Token expires → user logged out → bad UX

✅ With Interceptors:

Token expires → silent refresh → request retried → seamless
--------------
Front: Axios interceptor
Back: Function that runs before/after requests.

Front: _retry
Back: Prevent infinite refresh loops.

Front: useLayoutEffect
Back: Runs before UI paint — perfect for auth setup.
---------------
>>>>>>>>> useState(undefined)

➡ Means:

• undefined = still loading
• null = logged out
• string  = logged in
>>>>>>>>>>>>> useLayoutEffect ((Request Interceptor))

➡ Runs before browser paints UI.
👉 Runs before paint → interceptors ready. Adds token to every API call:

Guarantees interceptors exist before components fire requests.
.......To guarantee token injection before any API calls.

>>>  🔹 useLayoutEffect (Response Interceptor)

Intercepts:

403 Unauthorized
→ call refresh endpoint:
→ store new token
→ retry original request

➡ tries refresh
>>>>  _retry flag
Without this → refresh → fail → refresh → infinite.

Prevents infinite refresh loop.
Q: Why refresh tokens?
👉 Avoid forcing re-login.--------
This system:

• On app load → checks if user already logged in
• Stores access token in React state
• Adds token automatically to every API request
• If token expired → calls refresh endpoint
• Retries original request
• If refresh fails → logs user out

👉 User never notices refresh happening — seamless UX.
-----------------------
This authentication system uses React Context (Share auth state globally. Creates global auth store.) and Axios interceptors to globally manage access tokens(Interceptor adds token).
On app component  load, it restores the session from the backend(Backend returns data).
Every request automatically attaches the token.
If the token expires, a refresh endpoint is called and the original request is retried without user involvement.
(🔄 Token expired
Request → 403
Interceptor catches
Refresh token
Retry request
Success
)
If refresh fails, the user is logged out.
(Refresh 403
setAccessToken(null)
App redirects to login)

This ensures security, seamless UX, and centralized auth logic