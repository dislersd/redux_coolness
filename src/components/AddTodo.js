import React, { useState } from "react";

function AddTodo({ onAddClick, store }) {
  const [todo, setTodo] = useState("");
  const [id, setId] = useState(0);

  function onAddClick(text) {
    let newTodo = {
      id,
      text,
    };
    setId((oldId) => oldId + 1);
    store.dispatch({ type: "ADD_TODO", todo: newTodo });
  }

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
