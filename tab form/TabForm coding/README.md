Architecture & responsibilities (what to tell interviewer)

TabForm (parent)
Holds state: data, errors, activeTab.
Defines Tabs config: name, component, validate.
Controls navigation (click headings, Prev/Next/Submit).
Passes data, setData, errors to child components.
Profile / Interest / Settings (children)
Controlled UI for their fields.
Call setData to update parent state.
Render inline errors sent from parent.
Explain the main code flow (line-by-line summary, spoken)

useState for data holds all form values so switching tabs preserves values.
errors is an object keyed by field name used for inline messages.
activeTab is the tab index the UI shows.
Tabs array contains meta for each tab, including a validate() function that checks data, sets errors, and returns boolean pass/fail.
ActiveTabComponent is chosen from Tabs[activeTab].component and rendered with props.
Heading clicks:
If clicking earlier tab → allow immediately (backwards navigation).
If clicking a later tab → validate current tab; only move forward if valid.
handleNextClick: validates current tab and advances if no errors.
handlePrevClick: moves backwards.
handleSubmitClick: currently logs data (placeholder for API call).
What state you are storing and why

data (single object): single source of truth for the whole step form; easier to validate and to serialize on submit.
errors (object): show inline messages per field.
activeTab (integer): controls which component to render.
How immutability is preserved

setData uses functional update and spread: setData(prev=>({...prev, [item]: value})).
Interest checkboxes use spread and filter to build new arrays: ...[prev.interests, value] or prev.interests.filter(...).
How UI updates happen

Controlled inputs bind to data values.
onChange calls setData → new state reference → React re-renders and child shows updated value.
Validations update errors, which causes inline error messages to appear.
Time & complexity notes (what to say)

Field read/write: O(1).
Add/delete from interest array: O(n) to create new array (map/filter).
Validation is O(k) for k fields on that tab.
Promise-based network ops (submit) cost is network dependent; use submitting flag and AbortController for robustness.
Important issues, edge cases, and things to call out

Age value type: inputs return string; you should convert to Number before comparing to 18. (Current code uses data.age < 18 — if age becomes string, behavior still works in some cases but it's safer to parse.)
Validating only the current tab on Next: if user clicks to skip multiple tabs, validate intermediate tabs or forbid skipping forward more than one step.
Tabs array and validate functions are recreated every render — fine, but can be memoized with useMemo if needed.
Clicking headings to go backward does not clear errors — consider clearing errors for that tab.
Submit handler: currently logs; production needs API call with error handling, submitting state, retries/idempotency.
Input sanitization & server re-validation needed (never trust client-side validation only).
Accessibility: no ARIA roles for tablist/tab/panels, no keyboard arrow navigation, and focus management not handled.
Testing: validators should have unit tests; navigation and full flows should have integration/E2E tests.
Quick wins / immediate improvements (what to propose)

Convert Tabs into a const using useMemo so it isn’t recreated each render (optional).
Normalize data.age to Number in Profile handleDataChange: value = item === 'age' ? Number(e.target.value) : e.target.value.
In Tabs validate for settings: if no validations required, return true. If user may skip forward multiple steps, add a loop validating all tabs between current and target.
On submit: set submitting flag, try/catch API call, show success/error to user.
Add useForm custom hook or switch to useReducer for complex updates.
Add ARIA attributes for tabs and ensure keyboard support (ArrowLeft/ArrowRight).
Add unit tests for validators plus an integration test that submits a valid form.
What you did well (talk as self-feedback)

Centralized shape makes submit & validation easy.
Config-driven tabs make adding/removing tabs straightforward.
Clear separation: parent manages data and validation; children handle UI.
What you would add with more time (senior-level)

TypeScript types for data, errors, and Tabs.
Schema-based validation (Zod/Yup) and centralized schema mapping to each tab.
Autosave to localStorage (debounced) and restore prompt.
E2E tests & CI pipeline.
Accessibility improvements: ARIA, keyboard navigation, focus management.
Optimizations: memoized child components, stable handlers with useCallback when necessary.