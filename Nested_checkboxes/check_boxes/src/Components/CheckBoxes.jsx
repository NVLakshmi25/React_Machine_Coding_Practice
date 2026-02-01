import React from 'react'
import CheckBoxParent from './CheckBoxParent'

const CheckBoxes = ({ data, checked, setChecked,rootData }) => {
 const handleChange = (node) => {
  setChecked((prev) => {
    const newState = { ...prev };

    // toggle current node
    const isChecked = !prev[node.id];
    newState[node.id] = isChecked;

    // 🔁 recursively update children
    const updateChildren = (n) => {
      if (!n.children) return;

      n.children.forEach((child) => {
        newState[child.id] = isChecked;
        updateChildren(child); // recursion already handles grandchildren
      });
    };

    updateChildren(node);
    // if all children are checked, mark the parent as checked 
// 🔼 update parents (from root)
    updateParents(rootData, newState);

    return newState;
  });
};
// 🔹 Check if all children are checked
const areAllChildrenChecked = (node, state) => {
  if (!node.children || node.children.length === 0) return true;

  return node.children.every(
    (child) =>
      state[child.id] &&
      areAllChildrenChecked(child, state)
  );
};
// 🔹 Update parents after any toggle

//Pass the root tree to this function:
const updateParents = (nodes, state) => {
  nodes.forEach((node) => {
    if (node.children) {
      updateParents(node.children, state);

      const allChecked = areAllChildrenChecked(node, state);

      state[node.id] = allChecked;
    }
  });
};



  console.log(checked);

  return (
    <div>
      {data.map((node) => (
        <div className="parent" key={node.id}>
          <input
            type="checkbox"
            checked={!!checked[node.id]}
            onChange={() => handleChange(node)}
          />

          <span>{node.name}</span>

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