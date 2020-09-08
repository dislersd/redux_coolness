import React, { useState } from "react";

function AddTodo({ onAddClick }) {
  const [todo, setTodo] = useState("");

  return (
    <div>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        onClick={() => {
          onAddClick(todo);
          setTodo("");
        }}
      >
        Add Todo
      </button>
    </div>
  );
}

export default AddTodo;
