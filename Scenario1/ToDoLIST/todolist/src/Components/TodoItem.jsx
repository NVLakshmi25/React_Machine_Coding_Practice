import React from "react";
import  { memo } from "react";
const TodoItem = memo(function TodoItem({ todo, onDelete, onEdit }) {
  console.log("Todo rendered:", todo.text);

  return (
    <li className="flex items-center justify-between p-2 bg-white shadow rounded">
      <span>{todo.text}</span>

      <div className="flex gap-2">
        <button
          onClick={() =>
            onEdit(
              todo.id,
              prompt("Edit todo", todo.text) ?? todo.text
            )
          }
          className="px-2 py-1 bg-yellow-300 rounded"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(todo.id)}
          className="px-2 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </li>
  );
});
export default TodoItem ;
