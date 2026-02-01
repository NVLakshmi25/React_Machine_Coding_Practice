🧠 How this works (interview explanation)

If interviewer asks:

How did you prevent duplicate todos?

Say:

🗣️
"I validate input before adding.
I trim the text and compare it with existing todos using Array.some().
The comparison is case-insensitive.
If the item already exists, I show a validation message and block insertion."


🧠 Interview Explanation (say this 👇)

"Before adding a todo I trim the input and check duplicates using Array.some().
If the same text already exists, I block insertion and show a validation message."