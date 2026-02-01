Why use JSON for accordion?

“Using JSON allows the accordion to be data-driven. The UI can be rendered dynamically using .map() instead of hard-coding items.”


If interviewer asks:

How does accordion open/close work?

You can say:

👉 We store the currently opened index in state.
👉 When user clicks a title:

if same index → close (set null)

else → open new one

👉 Conditionally render content using:

openIndex === index

👉 Arrow rotates using Tailwind rotate-180.