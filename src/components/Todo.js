import React, { useState } from "react";
import FilterLink from "./FilterLink";

export const Todos = ({ store }) => {
  const [todo, setTodo] = useState("");
  const [id, setId] = useState(0);

  let todos = store.getState().todos;
  let filter = store.getState().visibilityFilter;

  function getVisibleTodos(todos, filter) {
    switch (filter) {
      case "SHOW_ALL":
        return todos;
      case "SHOW_COMPLETED":
        return todos.filter((t) => t.completed);
      case "SHOW_ACTIVE":
        return todos.filter((t) => !t.completed);
    }
  }

  function handleSubmit() {
    console.log("yup");
    let newTodo = {
      id,
      text: todo,
    };
    setId((oldId) => oldId + 1);
    store.dispatch({ type: "ADD_TODO", payload: newTodo });
  }

  const visibleTodos = getVisibleTodos(todos, filter);

  return (
    <div>
      {/* <div
        style={{
          color: filter === "Completed" ? "#99CCAB" : "#99CCFF",
          padding: "20px",
          fontSize: "30px",
          fontFamily: "helvetica, arial, mono-sans",
        }}
      >
        {filter}
      </div>

      <button
        style={{
          padding: "5px",
          background: "royalblue",
          color: "#FFFFE0",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "15px",
        }}
        onClick={() => {
          store.dispatch({ type: "SET_VISIBILITY_FILTER", payload: filter });
        }}
      >
        toggle completed
      </button> */}
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={handleSubmit}> Add Todo </button>
      <ul>
        {visibleTodos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => {
              store.dispatch({ type: "TOGGLE_TODO", payload: todo.id });
            }}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
            }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
      <p>
        Show:
        <FilterLink store={store} filter={"SHOW_ALL"} currentFilter={filter}>
          All{" "}
        </FilterLink>
        <FilterLink store={store} filter={"SHOW_ACTIVE"} currentFilter={filter}>
          Active{" "}
        </FilterLink>
        <FilterLink
          store={store}
          filter={"SHOW_COMPLETED"}
          currentFilter={filter}
        >
          Completed{" "}
        </FilterLink>
      </p>
    </div>
  );
};
