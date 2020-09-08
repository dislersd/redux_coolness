import React, { useState } from "react";
import FilterLink from "./FilterLink";
import TodoList from "./TodoList";

export const TodoApp = ({ store }) => {
  const [todo, setTodo] = useState("");
  const [id, setId] = useState(0);

  let todos = store.getState().todos;
  let filter = store.getState().visibilityFilter;
  const visibleTodos = getVisibleTodos(todos, filter);

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
    setTodo("");
  }

  return (
    <div>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={handleSubmit}> Add Todo </button>
      <TodoList
        todos={visibleTodos}
        onTodoClick={(id) =>
          store.dispatch({ type: "TOGGLE_TODO", payload: id })
        }
      />
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
