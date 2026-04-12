import React from 'react'
// ❌ This import is not used (can be removed)
import CheckBoxParent from './CheckBoxParent'

// 👇 This component renders checkboxes recursively
const CheckBoxes = ({ data, checked, setChecked, rootData }) => {

  // 🟢 HANDLE CHECK / UNCHECK
  const handleChange = (node) => {

    setChecked((prev) => {

      // 🧾 Copy previous state (IMPORTANT → don't mutate directly)
      const newState = { ...prev };

      // 🔁 Toggle current checkbox (true ↔ false)
      const isChecked = !prev[node.id];

      // ✅ Update current node
      newState[node.id] = isChecked;


      // 🔽 STEP 1: UPDATE ALL CHILDREN
      const updateChildren = (n) => {

        // ❌ If no children → stop
        if (!n.children) return;

        // 🔁 Loop through children
        n.children.forEach((child) => {

          // ✅ Set child same as parent
          newState[child.id] = isChecked;

          // 🔁 Recursively update deeper levels
          updateChildren(child);
        });
      };

      // 🚀 Call function
      updateChildren(node);


      // 🔼 STEP 2: UPDATE PARENTS
      updateParents(rootData, newState);

      return newState;
    });
  };


  // 🔹 CHECK IF ALL CHILDREN ARE CHECKED
  const areAllChildrenChecked = (node, state) => {

    // ✅ If no children → return true
    if (!node.children || node.children.length === 0) return true;

    // 🔁 Check every child
    return node.children.every((child) =>
      state[child.id] && // child must be checked
      areAllChildrenChecked(child, state) // and its children too
    );
  };


  // 🔹 UPDATE PARENT CHECKBOXES
  const updateParents = (nodes, state) => {

    nodes.forEach((node) => {

      if (node.children) {

        // 🔁 First update children
        updateParents(node.children, state);

        // ✅ Check if all children are selected
        const allChecked = areAllChildrenChecked(node, state);

        // 🔄 Update parent checkbox
        state[node.id] = allChecked;
      }
    });
  };


  console.log(checked);

  return (
    <div>

      {/* 🔁 LOOP THROUGH DATA */}
      {data.map((node) => (

        <div className="parent" key={node.id}>

          {/* ☑️ CHECKBOX */}
          <input
            type="checkbox"

            // 👇 Convert undefined → false
            checked={!!checked[node.id]}

            // 🔁 Handle click
            onChange={() => handleChange(node)}
          />

          {/* 🏷️ NAME */}
          <span>{node.name}</span>


          {/* 🔁 RECURSION (VERY IMPORTANT ⭐) */}
          {node.children && (
            <CheckBoxes
              data={node.children}
              checked={checked}
              setChecked={setChecked}
              rootData={rootData}
            />
          )}

        </div>
      ))}
    </div>
  );
};

export default CheckBoxes;

-----------------------------------------------------------------------------------------------------------------------
🧠 Simple Explanation (Easy Words)
🌳 What this component does

👉 Shows nested checkboxes (tree structure)
👉 Handles:

✅ Select parent → all children selected
❌ Unselect parent → all children unselected
🔼 Select all children → parent auto-selected
🔥 Core Logic (3 Steps)
✅ STEP 1: Toggle current checkbox
const isChecked = !prev[node.id];
newState[node.id] = isChecked;

👉 If checked → uncheck
👉 If unchecked → check

🔽 STEP 2: Update Children
updateChildren(node);

👉 If you select parent
→ all children also get selected

Example:
fruits ✅
 ├── Apple ✅
 ├── Apricot ✅
🔼 STEP 3: Update Parents
updateParents(rootData, newState);

👉 If all children are selected
→ parent becomes selected

Example:
Apple ✅
Apricot ✅
👉 fruits becomes ✅

🔁 Recursion (MOST IMPORTANT ⭐)
Where recursion happens?
1. Updating children
updateChildren(child);
2. Updating parents
updateParents(node.children, state);
3. Rendering UI
<CheckBoxes data={node.children} ... />

👉 Component calls itself again
👉 This is how nested structure works

🎯 Data Flow
User clicks checkbox
        ↓
handleChange()
        ↓
Update current node
        ↓
Update children
        ↓
Update parents
        ↓
setChecked()
        ↓
UI re-renders
⚡ Important Beginner Concepts
✅ 1. checked is an object
{
  "1": true,
  "2": false,
  "3": true
}
✅ 2. !!checked[node.id]

👉 Converts:

undefined → false
true → true
✅ 3. Immutable update
const newState = { ...prev };

👉 Never change state directly

⚠️ Small Improvements
❗ 1. Remove unused import
import CheckBoxParent from './CheckBoxParent' // ❌ remove
❗ 2. Add indentation (better UI)
.parent {
  margin-left: 20px;
}
🎤 Interview Answer (Simple)

"This component implements a recursive checkbox tree where selecting a node updates its children and parent nodes. It uses recursion to traverse the tree and maintain consistent checked states."

 
