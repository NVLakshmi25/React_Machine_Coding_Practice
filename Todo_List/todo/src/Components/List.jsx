import React, { useState } from "react";

const List = () => {
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [error, setError] = useState(""); // 🔥 NEW

  const addTodoItem = () => {
    const trimmedText = input.trim();

    // ❌ empty validation
    if (!trimmedText) {
      setError("Todo should not be empty!");
      return;
    }

    // ❌ duplicate validation
    const alreadyExists = todoList.some(
      (t) => t.text.toLowerCase() === trimmedText.toLowerCase()
    );

    if (alreadyExists) {
      setError("This todo already exists ❌");
      return;
    }

    const item = {
      id: Date.now(), // better unique id
      text: trimmedText,
      completed: false,
    };

    setTodoList((prev) => [...prev, item]);
    setInput("");
    setError(""); // clear error
  };

  const toggleCompleted = (id) => {
    setTodoList(
      todoList.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const deleteTodo = (id) => {
    setTodoList(todoList.filter((t) => t.id !== id));
  };

  return (
    <div className="todo-container">
      <div className="todo-input-row">
        <input
          type="text"
          placeholder="Enter todo"
          className="todo-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="todo-add" type="button" onClick={addTodoItem}>
          Add
        </button>
      </div>

      {/* 🔥 validation message */}
      {error && <p className="todo-error">{error}</p>}

      <ul className="todo-list">
        {todoList.map((t) => (
          <li key={t.id} className="todo-item">
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => toggleCompleted(t.id)}
            />

            <span
              className={`todo-text ${
                t.completed ? "strikeThrough" : ""
              }`}
            >
              {t.text}
            </span>

            <button
              className="todo-delete"
              onClick={() => deleteTodo(t.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
