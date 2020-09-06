import React, { useState } from "react";

export const Todos = ({ store }) => {
  // const [todos, _] = useState(store.getState().todos);
  // const [filter, setFilter] = useState(store.getState().visibilityFilter);
  const [todo, setTodo] = useState("");
  const [id, setId] = useState(0);

  let todos = store.getState().todos;
  let filter = store.getState().visibilityFilter;

  // todos={store.getState().todos}

  // filter={store.getState().visibilityFilter}

  // addTodo={(todo) => {}}

  // toggleTodo={(id) => store.dispatch({ type: "TOGGLE_TODO", payload: id })}

  // toggleCompleted={(filter) => store.dispatch({type: "SET_VISIBILITY_FILTER", payload: filter,})}

  function handleSubmit() {
    console.log("yup");
    let newTodo = {
      id,
      text: todo,
    };
    setId((oldId) => oldId + 1);
    store.dispatch({ type: "ADD_TODO", payload: newTodo });
  }

  return (
    <div>
      <div
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
      </button>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={handleSubmit}> Add Todo </button>
      <ul>
        {todos.map((todo) => (
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
    </div>
  );
};
