import React, { useState } from 'react'
import CheckBoxes from './CheckBoxes'; // 👈 child component that renders checkboxes

// 🌳 This is your DATA (tree structure)
const checkboxesData = [
  {
    id: "1",
    name: "fruits",
    children: [ // 👈 fruits has children (nested items)
      {
        id: "2",
        name: "Apple",
        children: [
          { id: "3", name: "Apricot" },
          { id: "4", name: "Avocado" },
          { id: "5", name: "Bilberry" },
          { id: "6", name: "Blackcurrant" },
        ],
      },
      {
        id: "7",
        name: "Papayacurrant",
        children: [
          { id: "8", name: "Date" },
          { id: "9", name: "Durian" },
          { id: "10", name: "Gooseberry" },
        ],
      }
    ],
  },

  // 🌿 These are simple items (no children)
  { id: "11", name: "Currant" },
  { id: "12", name: "Guava" },

  {
    id: "13",
    name: "Elderberry",
    children: [
      { id: "14", name: "Damson" },
    ],
  },

  { id: "15", name: "Cherimoya" },
  { id: "16", name: "Fig" },
];


// 👇 MAIN PARENT COMPONENT
const CheckBoxParent = () => {

    // 📦 This state stores which checkboxes are checked
    // Example:
    // { "1": true, "2": false, "3": true }
    const [checked, setChecked] = useState({});

    return (
        <div>

            {/* 👇 Passing data + state + functions to child component */}
            <CheckBoxes  
                data={checkboxesData}   // 🌳 full tree data
                checked={checked}      // ✅ which items are checked
                setChecked={setChecked} // 🔄 function to update checked state
                rootData={checkboxesData} // 📌 full data (used for recursion/logic)
            />

        </div>
    )
}

export default CheckBoxParent;
------------------------------------------------------------------------------------------------------------------------------
  Big Picture Flow
User clicks checkbox
        ↓
CheckBoxes component handles click
        ↓
setChecked() updates state
        ↓
UI re-renders with updated checkboxes .

  ⚡ Important Concepts (Beginner Level)
✅ 1. Tree Data
Nested structure
Parent → children → grandchildren
✅ 2. State
checked = object storing checkbox status
✅ 3. Props
Passing data from parent → child
✅ 4. Controlled Components
React controls checkbox state
🎤 Simple Interview Answer

"This component manages a nested checkbox tree using React state. The checked state is stored as an object, and data is passed to a child component that handles rendering and interactions."
