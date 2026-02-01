const checkboxesData=[
  {
    id:"1",
    name: "fruits",
    children :[
      {
        id:"2",
        name :"Apple",
        children:[
          {
            id:"3",
            name:"Apricot",
          },
          {
            id:"4",
            name:"Avocado",
          },
          {
            id:"5",
            name:"Bilberry",
          },
          {
            id:"6",
            name:"Blackcurrant",
          },
        ]
      },
    ]
  },
  {
   id:"7",
    name:  "Currant",
    children:[
      {
        id:"8",
    name: "Date",  
      },
      {
        id:"9",
    name:   "Durian", 
      },
       {
        id:"10",
    name:  "Gooseberry",
      },

    ]
  },
{
   id:"11",
 name: "Guava",
},
{
   id:"12",
 name:  "Elderberry",
 children:[
  {
    id:"13",
    name:"Damson",
    children :[
      {
        
   id:"14",
 name:  "Fig",

      }
    ]
  }
 ]
},
{
  
   id:"15",
 name: "Cherimoya",
},

]

--------------------------------------------------------
🧠 What This Does

When you click a checkbox:

1️⃣ Toggles that node
2️⃣ If it has children → all descendants get same value
3️⃣ State updated once (safe + performant)

✅ Everything else in your component is correct:

recursive rendering ✔

controlled checkbox ✔

lifting state up ✔

passing props ✔

------------------------------------
👉 If all children are checked → automatically check the parent
👉 If some children are checked → parent becomes indeterminate (optional bonus)
✅ GOAL

When you toggle any checkbox:

Update all children (already done ✔)

Walk upwards and:

✅ check parent if all children checked

❌ uncheck parent if any child unchecked.
🧠 Core Idea

We need two helpers:

1️⃣ areAllChildrenChecked(node, state)
2️⃣ updateParents(rootNodes, state) – recalculates parents after change

Because the tree is recursive, parents don't know children unless we traverse from the root.
-------------------------
🔥 WHY THIS WORKS

React recursion breaks tree visibility.

So:

Without rootData	With rootData
Only local subtree	Full hierarchy
Parents not updated	Parents auto-check
❌ Broken	✅ Works

------------------------
🧠 INTERVIEW TIP

This is classic tree upward propagation problem.

If you explain:

"We update children downward, and recompute parents by traversing from root upward"

— that sounds very strong in interviews 😎
-------------------------------------
🟡 SECOND ISSUE (LOGIC IMPROVEMENT)

Currently:

clicking parent checks children ✔️

clicking children updates parent ✔️

But leaf nodes without children:

areAllChildrenChecked(node, state)


returns true immediately — OK.





