import React, { useState } from 'react'
import json from './data.json'
import ListObjects from './ListObjects'

const File_FolderStructure = () => {
    const [data, setData]=useState(json);
   const addNodeToList = (parentId , isFolder) => {
   const name = prompt(
    isFolder ? "Enter Folder Name" : "Enter File Name"
  );
   if (!name) return;

  const updateTree = (list) => {
    return list.map((node) => {
      // 🎯 If this is the parent → add child
      if (node.id === parentId) {
        return {
          ...node,
          children: [
            ...(node.children || []),
            {
              id: Date.now().toString(),
              name:name,
              isFolder,
             children: isFolder ? [] : null,
            },
          ],
        };
      }

      // 🔁 Go deeper if children exist
      if (node.children ) {
        return {
          ...node,
          children: updateTree(node.children),
        };
      }

      return node;
    });
  };

  setData((prev) => updateTree(prev));
};

const deleteNodeFromList = (itemId) => {
  const updateTree = (list) => {
    return list
      .filter((node) => node.id !== itemId)
      .map((node) => {
        if (node.children ) {
          return {
            ...node,
            children: updateTree(node.children),
          };
        }

        return node;
      });
  };

  setData((prev) => updateTree(prev));
};



  return (
    <div>
        <h1 className='header'>File/Folder Explorer</h1>
        <ListObjects  listObjects={data} addNodeToList={addNodeToList}  deleteNodeFromList={deleteNodeFromList} />
    </div>
  )
}

export default File_FolderStructure