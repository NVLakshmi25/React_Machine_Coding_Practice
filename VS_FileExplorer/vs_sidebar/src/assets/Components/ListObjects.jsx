import React, { useState } from 'react'

// 🌳 This component renders file/folder tree recursively
const ListObjects = ({ listObjects, addNodeToList, deleteNodeFromList }) => {

    // 📂 Track which folders are expanded (open/close)
    // Example: { "1": true, "2": false }
    const [isExpanded, setIsExpanded] = useState({});

    return (
        <div className='container'>

            {/* 🔁 Loop through all nodes */}
            {listObjects.map((node) => (

                <div key={node.id} className='main'>

                    {/* ===== ROW (Single File/Folder) ===== */}
                    <div className='main_folder'>

                        {/* ➕ / ➖ Expand / Collapse button (only for folders) */}
                        {node.isFolder && (
                            <span
                                className='highlight'
                                onClick={() =>
                                    setIsExpanded((prev) => ({
                                        ...prev,
                                        [node.id]: !prev[node.id], // toggle expand/collapse
                                    }))
                                }
                            >
                                {/* Show "-" if expanded, "+" if collapsed */}
                                {isExpanded?.[node.id] ? " - " : " + "}
                            </span>
                        )}

                        {/* 📄📁 Display file/folder name */}
                        <span className="node-name">{node.name}</span>


                        {/* 📁 Add Folder button (only for folders) */}
                        {node?.isFolder && (
                            <span onClick={() => addNodeToList(node.id, true)}>
                                <img
                                    src="https://pngfre.com/wp-content/uploads/Folder-1.png"
                                    alt="icon"
                                    className='icon'
                                />
                            </span>
                        )}


                        {/* 📄 Add File button (only for folders) */}
                        {node.isFolder && (
                            <span onClick={() => addNodeToList(node.id, false)}>
                                <img
                                    src="https://static.vecteezy.com/system/resources/previews/047/132/123/non_2x/document-icon-isolated-on-white-background-file-copy-icon-for-web-and-application-vector.jpg"
                                    alt="icon"
                                    className='icon'
                                />
                            </span>
                        )}


                        {/* 🗑️ Delete button (for both file & folder) */}
                        <span onClick={() => deleteNodeFromList(node.id)}>
                            <img
                                src="https://cdn-icons-png.flaticon.com/256/1345/1345874.png"
                                alt="icon"
                                className="icon"
                            />
                        </span>

                    </div>


                    {/* ===== CHILDREN (RECURSION) ===== */}
                    {isExpanded?.[node.id] && node?.children && (

                        <div className="main_file">

                            {/* 🔁 Recursive call → render children */}
                            <ListObjects
                                listObjects={node.children}
                                addNodeToList={addNodeToList}
                                deleteNodeFromList={deleteNodeFromList}
                            />

                        </div>
                    )}

                </div>
            ))}

        </div>
    )
}

export default ListObjects;

--------------------------------------------------------------------------------------------------------------------------------
    🧠 Simple Explanation

This component is responsible for:

👉 Displaying files & folders
👉 Handling expand/collapse
👉 Calling add/delete actions
👉 Rendering nested folders (recursion)

🌳 Core Concept → RECURSION (Very Important ⭐)
🔁 This line is the heart:
<ListObjects listObjects={node.children} ... />

👉 The component calls itself to render nested folders

⚙️ How it works (Step-by-step)
1. Render all nodes
Loop through listObjects
Show name, icons, buttons
2. Expand / Collapse
isExpanded[node.id] = true / false
Click ➕ → open folder
Click ➖ → close folder
3. Add actions
📁 → add folder
📄 → add file
4. Delete
Removes node (handled in parent)
5. Recursive rendering
If expanded → show children
Children again rendered using same component
🔥 Visual Flow
Folder A
  ├── File 1
  ├── File 2
  └── Folder B
        ├── File 3
        └── Folder C
              └── File 4

👉 Each level uses same component again

⚡ Important Notes
❗ 1. isExpanded is an object
{
  "1": true,
  "2": false
}

✔ Tracks multiple folders independently

❗ 2. Safe optional chaining
isExpanded?.[node.id]
node?.children

✔ Prevents errors

❗ 3. Controlled UI behavior
Only folders can expand
Files cannot expand
🚀 Improvements
✅ 1. Better icons

Use libraries like:

react-icons
lucide-react
✅ 2. Animation (smooth expand)

Use:

transition: all 0.3s ease;
✅ 3. Rename feature

Add edit button → update name

✅ 4. Persist expanded state

Save isExpanded in localStorage

🎤 Interview Answer

"This component recursively renders a tree structure where each node can expand or collapse. It uses local state to track expanded nodes and calls itself to render nested children, making it scalable for deeply nested file systems."
