
https://ui.shadcn.com/docs/components/radix/input-otp 

OTP Input Component with React & TailwindCSS

A fully functional OTP input component built in React with features like auto-focus, backspace navigation, paste support, validation, timer for resend, and success modal popup. Styled using TailwindCSS and DaisyUI for clean and responsive UI.

🧩 Features

6-digit OTP input with individual input boxes

Auto-focus on first input and on next input as user types

Backspace navigation: go back to previous box when deleting

Paste OTP: allows full OTP pasting with automatic distribution

Validation: checks OTP against a fake backend

Success & Error messages with shake animation for errors

Resend OTP timer: 30s countdown before resending

Success Modal Popup on correct OTP

Fully responsive using TailwindCSS

Optional enhancements: indeterminate state, dynamic OTP length

⚡ Core Concepts Demonstrated
React.js

useState for controlled input state

useRef for direct DOM element focus management

useEffect for lifecycle events (auto-focus, timer countdown)

Controlled components: value and onChange

Conditional rendering (error, success, modal)

Handling user events: onChange, onKeyDown, onPaste

Component reusability (GenerateOTP vs OtpAdditionalFeatures)

State immutability using spread operator

Programmatic focus management

JavaScript

Recursion-free array manipulation (Array.fill, .map, .every)

Clipboard events (onPaste) with regex to sanitize input

Timer logic using setInterval and clearInterval

Conditional execution based on state (submitted, timer)

Timeout simulation for OTP validation (setTimeout)

Basic validation (isNaN, trimming, limiting maxLength)

HTML

Semantic input fields for numeric OTP

Accessibility: inputMode="numeric"

Proper form-like UX with focus and navigation

TailwindCSS + DaisyUI

Utility classes for layout (flex, gap-3, min-h-screen)

Responsive and styled inputs

Shake animation for error feedback

Modal popup overlay styling

Button hover and focus effects

🛠 Installation

Clone the repo:

git clone https://github.com/yourusername/otp-react-tailwind.git
cd otp-react-tailwind


Install dependencies:

npm install


Start the development server:

npm start


Open http://localhost:3000 in your browser.

💻 Usage
Basic Component
import GenerateOTP from './Components/GenerateOTP';

function App() {
  return <GenerateOTP />;
}

Advanced Component with Validation & Timer
import OtpAdditionalFeatures from './Components/OtpAdditionalFeatures';

function App() {
  return <OtpAdditionalFeatures />;
}

🧠 How it Works

OTP is stored in a useState array of 6 digits.

Each input box is controlled using value and onChange.

useRef keeps references to inputs for programmatic focus.

Backspace moves focus to previous input if empty.

Paste is handled via onPaste, sanitizing non-numeric input.

OTP is auto-submitted when all digits are entered.

Success modal is displayed if OTP matches CORRECT_OTP.

Resend timer prevents immediate resends, shows countdown.

⏱ Timer & Resend Logic

Uses useEffect to decrease timer every second.

OTP input resets on resend.

Focus is set back to the first input automatically.

🎨 Styling

TailwindCSS: utility-first for layouts and responsiveness

DaisyUI: modal styling, buttons

Shake animation for invalid OTP

Smooth modal popup with scale-in animation

📌 Core React Concepts to Discuss in Interviews

Controlled components vs uncontrolled

State immutability (setState with copies)

useRef for DOM manipulation

Lifting state up if multiple components share OTP state

Conditional rendering for error/success UI

Handling side-effects with useEffect

Timer logic & cleanup with clearInterval

🏆 What I Learned

Managing input focus programmatically

Handling user input edge cases (paste, backspace, invalid input)

Timer implementation in React

Creating reusable, dynamic input components

Integrating TailwindCSS animations with React state

UX improvements: error shake, auto-submit, modal feedback

🔮 Possible Improvements

Add indeterminate state for partial OTP input

Connect to real backend API for OTP validation

Add keyboard accessibility and ARIA attributes

Dynamic OTP length input

Unit tests with Jest + React Testing Library

Dark mode support using TailwindCSS variants

📂 Folder Structure
src/
 ├─ Components/
 │   ├─ GenerateOTP.jsx
 │   └─ OtpAdditionalFeatures.jsx
 ├─ App.css
 ├─ App.jsx
 └─ index.js

✅ Interview Tips

Explain state design: array of digits

Explain why useRef: to focus inputs programmatically

Show controlled components understanding

Explain validation logic and timer

Mention React + JS + Tailwind synergy

Discuss edge cases: backspace, paste, invalid input

Show clean, scalable JS logic
}
.head{
  @apply  text-2xl   font-bold mb-4 ;
}
.otp-container{
  @apply  flex min-h-screen items-center justify-center ;
}
----------------------------------------------------------------------------------------------------------------------------------------------------
OTP Input Component with React, TailwindCSS & Advanced Features

A modern, reusable OTP input component built in React with auto-focus, backspace navigation, paste support, validation, success modal, and resend timer. Fully styled using TailwindCSS and DaisyUI.

⚡ Features

6-digit OTP input fields

Auto-focus first input and next input on typing

Backspace navigation to previous input

Paste full OTP from clipboard

Auto-submit when all digits entered

Success modal popup with animation

Error handling with shake animation

Resend OTP timer with countdown

Disable input after submission

Clean responsive design with TailwindCSS

🧩 Core Concepts Explained
JavaScript Concepts

Array.fill() – initialize array for OTP digits:

new Array(OTP_DIGITS_COUNT).fill("")


Array.map() – render multiple input fields dynamically

Spread operator [...] – create a copy of state array to maintain immutability

String.slice() – take only the last character typed

isNaN() – validate numeric input

setInterval / clearInterval – countdown timer for resend OTP

setTimeout – simulate async OTP verification

Event handling – onChange, onKeyDown, onPaste

React Concepts

useState – manage input array and UI states (error, success, submitted, timer)

useRef – store references to input elements for programmatic focus

useEffect – run side-effects: auto-focus first input, timer countdown

Controlled Components – input value bound to state and updated via onChange

Conditional Rendering – show error, success messages and modal

Component Reusability – GenerateOTP (basic) and OtpAdditionalFeatures (advanced)

State immutability – update state with new arrays to prevent unexpected behavior

📝 Code Logic Line-by-Line

Initialize OTP State

const [inputArr, setInputArr] = useState(new Array(OTP_DIGITS_COUNT).fill(""));


Purpose: store each OTP digit in a controlled array.

Create Refs

const refArr = useRef([]);


Purpose: programmatically focus inputs.

Auto-focus First Input

useEffect(() => { refArr.current[0]?.focus(); }, []);


Runs on mount to focus the first OTP box.

Handle Input Change

const handleOnChange = (value, index) => {
  if (isNaN(value)) return;
  const newArr = [...inputArr];
  newArr[index] = value.slice(-1);
  setInputArr(newArr);
  refArr.current[index + 1]?.focus();
};


Accept only numbers, store last digit, auto-move focus.

Backspace Navigation

const handleOnKeyDown = (e, index) => {
  if (!inputArr[index] && e.key === "Backspace") refArr.current[index - 1]?.focus();
};


Move focus to previous input if current is empty.

Paste OTP

const handlePaste = (e) => {
  e.preventDefault();
  const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_DIGITS_COUNT).split("");
  setInputArr(pasted);
  if (pasted.length === OTP_DIGITS_COUNT) handleSubmit(pasted.join(""));
};


Handles multi-digit OTP pasted from clipboard.

Submit OTP

const handleSubmit = (otp) => {
  setSubmitted(true);
  setError(""); setSuccess("");
  setTimeout(() => { otp === CORRECT_OTP ? setShowSuccessModal(true) : setError("Invalid OTP"); }, 1000);
};


Compare OTP with backend, show success modal or error.

Resend Timer

useEffect(() => { 
  if (timer === 0 || showSuccessModal) return;
  const interval = setInterval(() => setTimer(t => t - 1), 1000);
  return () => clearInterval(interval);
}, [timer, showSuccessModal]);


Countdown timer for resend button.

Render UI

OTP input boxes, error/success messages, resend timer, modal popup.

🔧 Output Behavior

Typing auto-moves cursor

Backspace moves to previous input if current is empty

Paste fills inputs

Auto-submit OTP on complete

Shake animation on wrong OTP

Modal popup on success

Timer prevents resend before 30s

⚡ Performance & Improvements

Memoize inputs with React.memo for large OTP inputs

Debounce submit for network-intensive OTP verification

Dynamic OTP length via props

Custom hooks: useOtpInput for reusability

Keyboard navigation support: arrow keys

Accessibility: ARIA attributes

Testing: Jest + React Testing Library

Vite + React 18+: faster hot reload and production build

🎯 Interview Preparation
1-Minute Elevator Pitch

"I built a reusable OTP input component in React using controlled components, useState for state, and useRef for input focus. It handles typing, backspace, paste, auto-submit, resend timer, error handling with animations, and success modal. I focused on immutability, performance, and responsive UI with TailwindCSS, and ensured UX improvements like auto-focus and visual feedback."

Flashcards / Quick Concepts
Concept	Description
useState	Stores OTP digits and UI states
useRef	Tracks input elements for focus
useEffect	Runs side-effects like timer & auto-focus
Controlled input	value tied to state
setInterval	Countdown timer
onPaste	Capture clipboard data
Spread operator	Clone state array immutably
maxLength=1	Limit input visually
Mock Interview Q&A

Q: How do you handle multi-digit paste?
A: I sanitize input with replace(/\D/g,"") and slice to OTP length.

Q: How does backspace navigation work?
A: If current input is empty and Backspace is pressed, focus moves to previous box.

Q: Why use useRef here?
A: To programmatically focus inputs without rerendering.

Q: How to improve performance?
A: Use React.memo, custom hook, debounce submit, dynamic OTP length via props.

Q: How do you validate OTP?
A: Compare concatenated digits with backend OTP and show success or error feedback.

💻 Installation (Vite + React 18+)
npm create vite@latest otp-app --template react
cd otp-app
npm install
npm install tailwindcss daisyui
npm run dev


Copy GenerateOTP.jsx and OtpAdditionalFeatures.jsx into src/components

Import in App.jsx

import OtpAdditionalFeatures from './components/OtpAdditionalFeatures';

📂 Folder Structure
src/
 ├─ components/
 │   ├─ GenerateOTP.jsx
 │   └─ OtpAdditionalFeatures.jsx
 ├─ App.jsx
 ├─ App.css
 └─ main.jsx


✅ Next-Level Features to Add Later

Arrow key navigation

Dynamic OTP length via props

Custom animations

API integration for real OTP backend

Unit tests with Jest
------------------------------------------------------------------------------------------------------------------------------------------------------------

Project Overview

This project implements a reusable OTP input component in React with features like:

6-digit OTP input

Auto-focus on first input & next input on typing

Backspace navigation to previous input

Paste OTP from clipboard

Auto-submit on complete OTP entry

Error handling with shake animation

Success modal popup

Resend OTP timer

Disable input while verifying

Responsive design using TailwindCSS and DaisyUI

⚡ Features
Feature	Status
Input only numbers	✅
Auto-focus & next input move	✅
Backspace navigation	✅
Paste OTP support	✅
Auto-submit on complete OTP	✅
Shake animation on wrong OTP	✅
Resend OTP timer	✅
Disable input after submit	✅
Success modal popup	✅
🧠 Core Concepts
React Concepts

useState → Manages OTP digits, UI states (error, success, submitted, timer)

useRef → References inputs for programmatic focus

useEffect → Handles side effects like timer countdown & auto-focus

Controlled components → Input value is synced with state

Conditional rendering → Show error, success, modal popup dynamically

Immutability → [...] spread operator ensures state isn’t mutated directly

JavaScript Concepts

Arrays → Array.fill(), Array.map() for input rendering

String → slice() for keeping only last digit typed

Events → onChange, onKeyDown, onPaste

setInterval & setTimeout → Timer & simulate async OTP verification

isNaN → Numeric validation

Clipboard API → Handle paste of OTP

🔧 Code Logic Explained

State Initialization

const [inputArr, setInputArr] = useState(new Array(OTP_DIGITS_COUNT).fill(""));


Stores each OTP digit in an array.

Input Refs

const refArr = useRef([]);


Keeps references to input elements to programmatically focus inputs.

Auto-focus First Input

useEffect(() => { refArr.current[0]?.focus(); }, []);


Handle Input Change

const handleOnChange = (value, index) => {
  if (isNaN(value)) return;
  const newArr = [...inputArr];
  newArr[index] = value.slice(-1);
  setInputArr(newArr);
  refArr.current[index + 1]?.focus();
};


Only numbers allowed, last digit saved, cursor moves to next input.

Backspace Navigation

const handleOnKeyDown = (e, index) => {
  if (!inputArr[index] && e.key === "Backspace") refArr.current[index - 1]?.focus();
};


Moves focus to previous input if current is empty.

Paste OTP

const handlePaste = (e) => {
  e.preventDefault();
  const pasted = e.clipboardData.getData("text").replace(/\D/g,"").slice(0, OTP_DIGITS_COUNT).split("");
  setInputArr(pasted);
  if (pasted.length === OTP_DIGITS_COUNT) handleSubmit(pasted.join(""));
};


Submit OTP

const handleSubmit = (otp) => {
  setSubmitted(true);
  setError(""); setSuccess("");
  setTimeout(() => {
    otp === CORRECT_OTP ? setShowSuccessModal(true) : setError("Invalid OTP");
  }, 1000);
};


Resend Timer

useEffect(() => {
  if (timer === 0 || showSuccessModal) return;
  const interval = setInterval(() => setTimer(t => t - 1), 1000);
  return () => clearInterval(interval);
}, [timer, showSuccessModal]);

🕵️ Interview Q&A (Basic → Advanced)
Project Explanation

Q: What is this project?
A: A reusable OTP input component in React with validation, paste support, auto-submit, and UI feedback.

Q: What states are stored?
A: OTP digits, error, success, submission status, timer, and modal visibility.

Q: Why store OTP digits as an array?
A: Allows easy mapping to input fields and controlled updates.

Q: How do you maintain immutability?
A: By copying the array with [...inputArr] before updating.

Logic & React Core

Q: Why use useRef?
A: To focus inputs programmatically without triggering re-renders.

Q: How does backspace navigation work?
A: If current input is empty, pressing backspace focuses previous input.

Q: How do you handle paste?
A: Using onPaste and clipboardData, sanitize input and split into digits.

Q: How is UI updated?
A: Controlled inputs reflect state changes via setInputArr.

Q: Time complexity?
A: O(n) for update and paste operations (n = OTP length, usually 6).

Edge Cases

Prevent letters via isNaN

Prevent multiple characters per input via slice(-1)

Disable inputs during submission

Resend OTP only after timer completes

Advanced Questions

Q: How to improve performance?
A: Use React.memo for input components, custom hook for OTP logic, debounce submit.

Q: How to make it dynamic?
A: Pass OTP_DIGITS_COUNT as prop, accept backend OTP via props.

Q: How to integrate with real backend?
A: Replace CORRECT_OTP with API call and handle async verification.

Q: Accessibility?
A: Add ARIA labels, proper tab index, and focus indicators.

What I Learned

Controlled components & input handling in React

useRef for DOM manipulation

Timers & asynchronous behavior in React

Edge case handling for forms and inputs

TailwindCSS & DaisyUI for responsive UI

Future Improvements

Arrow key navigation between inputs

Unit testing with Jest / React Testing Library

API integration for real OTP verification

Dynamic OTP length via props

Enhanced animations

💻 Installation (Vite + React 18+)
npm create vite@latest otp-app --template react
cd otp-app
npm install
npm install tailwindcss daisyui
npm run dev


Copy GenerateOTP.jsx & OtpAdditionalFeatures.jsx into src/components

Import in App.jsx:

import OtpAdditionalFeatures from './components/OtpAdditionalFeatures';

⚡ Interview Tip: How to Explain

Explain state & refs first.

Describe controlled inputs & UI updates.

Explain logic for typing, backspace, paste, submit, timer.

Discuss immutability and why spread operator is used.

Mention edge cases and enhancements.

Show understanding of React hooks, JS array/string methods, and performance optimization.
----------------------------------------------------------------------------------------------------------------------------------------
1️⃣ Elevator Pitch (30 sec)

"I built a reusable OTP input component in React that handles numeric input, paste support, auto-submit, error handling with shake animation, success modal, and a resend timer. It uses controlled inputs and useState for OTP digits, useRef to focus inputs programmatically, and useEffect for side effects like timer countdown and auto-focus. The app validates OTP asynchronously, disables inputs during verification, and is styled with TailwindCSS and DaisyUI. This project helped me master React hooks, state management, controlled forms, and edge-case handling in inputs."

2️⃣ Line-by-Line Explanation (60 sec)
State Management
const [inputArr, setInputArr] = useState(new Array(OTP_DIGITS_COUNT).fill(""));


Stores each OTP digit in an array.

Allows mapping to multiple input boxes.

const [error, setError] = useState("");
const [success, setSuccess] = useState("");
const [submitted, setSubmitted] = useState(false);


Handles UI feedback and submission state.

const refArr = useRef([]);


References each input box for programmatic focus.

Auto-focus
useEffect(() => { refArr.current[0]?.focus(); }, []);


Focuses first input on mount.

Input Change Handling
const handleOnChange = (value, index) => {
  if (isNaN(value)) return; // numeric only
  const newArr = [...inputArr];
  newArr[index] = value.slice(-1); // only last digit
  setInputArr(newArr);
  refArr.current[index + 1]?.focus(); // move to next
  if (newArr.every(v => v !== "")) handleSubmit(newArr.join(""));
};


Controlled input updates, auto-next focus, auto-submit when all digits filled.

Backspace Navigation
const handleOnKeyDown = (e, index) => {
  if (!inputArr[index] && e.key === "Backspace") refArr.current[index - 1]?.focus();
};


Moves focus to previous input if current is empty.

Paste OTP
const handlePaste = (e) => {
  e.preventDefault();
  const pasted = e.clipboardData.getData("text").replace(/\D/g,"").slice(0, OTP_DIGITS_COUNT).split("");
  setInputArr(pasted);
  if (pasted.length === OTP_DIGITS_COUNT) handleSubmit(pasted.join(""));
};


Sanitizes input, splits digits, auto-submits if complete.

OTP Submission
const handleSubmit = (otp) => {
  setSubmitted(true);
  setError(""); setSuccess("");
  setTimeout(() => {
    if (otp === CORRECT_OTP) setShowSuccessModal(true); 
    else setError("Invalid OTP");
  }, 1000);
};


Simulates async verification, shows error or success modal.

Resend Timer
useEffect(() => {
  if (timer === 0 || showSuccessModal) return;
  const interval = setInterval(() => setTimer(t => t - 1), 1000);
  return () => clearInterval(interval);
}, [timer, showSuccessModal]);


Countdown for enabling resend button.

UI Output Example

Empty inputs on start: [ '', '', '', '', '', '' ]

Typing 1 in first box → [ '1', '', '', '', '', '' ] → cursor auto-moves next

Full OTP 123456 → auto-submit → success modal shows

Invalid OTP → shake animation + error message

3️⃣ Flashcards for Quick Recall
Concept	Flash Answer
OTP digits stored as	Array (useState)
Move cursor programmatically	useRef
Handle numeric only	isNaN + slice(-1)
Backspace empty box	Focus previous input
Paste full OTP	onPaste + clipboardData
Auto-submit OTP	newArr.every(v => v !== "")
Resend timer	useEffect + setInterval
Disable inputs during submit	disabled={submitted}
Shake animation on error	CSS @keyframes shake
Success modal	Conditional rendering + TailwindCSS/DaisyUI
4️⃣ Frequently Asked Interview Questions & Sample Answers

Q1: Why use an array for OTP state?
A: Allows mapping to multiple inputs and easy updates without mutating state.

Q2: How do you handle input immutability?
A: Spread operator [...inputArr] ensures a new array is created each time.

Q3: Why useRef instead of state for input focus?
A: Prevents unnecessary re-renders when focusing inputs programmatically.

Q4: How is paste handled?
A: We sanitize clipboard data, split digits, update state, and auto-submit if full.

Q5: How would you optimize performance?
A: Wrap input boxes in React.memo, use a custom hook for OTP logic, and debounce submit calls.

Q6: How do you manage edge cases?
A: Restrict numeric input, limit max length, disable input during submission, and handle empty backspace.

Q7: What did you learn?
A: Controlled inputs, useRef for DOM access, async validation simulation, and TailwindCSS UI.
----------------------------------------------------------------------------------------------------------------------------------------------------------------





