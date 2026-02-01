import React from "react";
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, editTodo } from "../todoSlice";
import TodoItem from "./TodoItem";

export default function TodoListAdvanced() {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  // get todos from store  // ✔ state comes from  redux store
  const todos = useSelector((state) => state.todos.list);

  const handleAdd = useCallback(() => {
    if (!text.trim()) return;

    dispatch(
      addTodo({
        id: Date.now(),
        text: text.trim(),
      })
    );

    setText("");
  }, [text, dispatch]);

  const handleDelete = useCallback((id) => {
    dispatch(deleteTodo(id));
  }, [dispatch]);

  const handleEdit = useCallback((id, newText) => {
    dispatch(editTodo({ id, text: newText }));
  }, [dispatch]);

  return (
    <div className="space-y-3 max-w-md mx-auto">
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border p-2 rounded"
          placeholder="Add a todo"
        />

        <button
          onClick={handleAdd}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map((t) => (
          <TodoItem
            key={t.id}
            todo={t}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </ul>
    </div>
  );
}
