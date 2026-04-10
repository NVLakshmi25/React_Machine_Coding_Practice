import React, { useState } from 'react'
import json from './data.json' // 📂 initial file/folder structure (tree data)
import ListObjects from './ListObjects' // 🧩 component to render tree recursively

const File_FolderStructure = () => {

    // 🌳 State to store full file/folder tree
    const [data, setData] = useState(json);


    // ➕ ADD FILE / FOLDER FUNCTION
    const addNodeToList = (parentId, isFolder) => {

        // 📝 Ask user to enter name
        const name = prompt(
            isFolder ? "Enter Folder Name" : "Enter File Name"
        );

        // ❌ If no name entered → stop
        if (!name) return;


        // 🔁 Recursive function to update tree
        const updateTree = (list) => {

            return list.map((node) => {

                // 🎯 If current node is the parent → add new child here
                if (node.id === parentId) {
                    return {
                        ...node,
                        children: [
                            ...(node.children || []), // keep old children
                            {
                                id: Date.now().toString(), // unique id
                                name: name, // new file/folder name
                                isFolder, // true = folder, false = file
                                children: isFolder ? [] : null, // folder has children, file doesn't
                            },
                        ],
                    };
                }

                // 🔁 If node has children → go deeper (recursion)
                if (node.children) {
                    return {
                        ...node,
                        children: updateTree(node.children),
                    };
                }

                // 🔙 Return unchanged node
                return node;
            });
        };

        // 🔄 Update state with new tree
        setData((prev) => updateTree(prev));
    };


    // ❌ DELETE FILE / FOLDER FUNCTION
    const deleteNodeFromList = (itemId) => {

        // 🔁 Recursive function to remove node
        const updateTree = (list) => {

            return list
                // 🗑️ Remove node with matching id
                .filter((node) => node.id !== itemId)

                // 🔁 Check children recursively
                .map((node) => {

                    if (node.children) {
                        return {
                            ...node,
                            children: updateTree(node.children),
                        };
                    }

                    return node;
                });
        };

        // 🔄 Update state after deletion
        setData((prev) => updateTree(prev));
    };


    return (
        <div>

            {/* 📌 Title */}
            <h1 className='header'>File/Folder Explorer</h1>

            {/* 🌳 Pass tree + functions to child component */}
            <ListObjects
                listObjects={data} // tree data
                addNodeToList={addNodeToList} // add function
                deleteNodeFromList={deleteNodeFromList} // delete function
            />
        </div>
    )
}
----------------------------------------------------------------------------------------------------------------------------------
⚙️ Key Concepts
1. Tree Structure
Folder → has children
File → children = null
2. Recursion (VERY IMPORTANT ⭐)
➕ Add Node
Find parent
Insert child
If not found → go deeper
❌ Delete Node
Remove node using filter
Repeat inside children
🔁 Flow
Add Folder/File
User Click → Prompt → Find Parent → Add Child → Update State
Delete Folder/File
User Click → Find Node → Remove → Update State
⚡ Important Notes
❗ 1. Recursion is the key
Without recursion → cannot handle nested folders
❗ 2. Immutable update
You never modify original data
You return new updated tree
❗ 3. Unique ID
id: Date.now().toString()
Works but not perfect (can collide rarely)
🚀 Improvements (Advanced)
✅ 1. Better ID

Use:

import { v4 as uuidv4 } from 'uuid';
id: uuidv4()
✅ 2. Replace prompt()

Use custom modal input (better UI)

✅ 3. Add rename feature
Update node name using same recursion logic
🎤 Interview Answer

"This component implements a recursive tree structure to manage a file/folder system. It uses recursion to traverse and update nested nodes for operations like add and delete while maintaining immutability."

export default File_FolderStructure;
