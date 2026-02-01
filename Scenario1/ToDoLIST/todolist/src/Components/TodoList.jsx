import React from 'react';
import  { useState } from 'react'

export default function TodoList() {
  const [todos, setTodos] = useState([]); // { id, text }
  const [text, setText] = useState("");

  function addTodo() {
    if (!text.trim()) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text: text.trim() },
    ]);
    setText("");
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function editTodo(id, newText) {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, text: newText } : t
      )
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border p-2 rounded"
          placeholder="Add a todo"
        />
        <button
          onClick={addTodo}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {todos.map((t) => (
          <li
            key={t.id}
            className="flex items-center justify-between p-2 bg-white shadow rounded"
          >
            <span>{t.text}</span>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  editTodo(
                    t.id,
                    prompt("Edit todo", t.text) ?? t.text
                  )
                }
                className="px-2 py-1 bg-yellow-300 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteTodo(t.id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

