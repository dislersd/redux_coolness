import React, { useState } from "react";
import FilterLink from "./FilterLink";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";

export const TodoApp = ({ store }) => {
  const [id, setId] = useState(0);

  let { todos } = store.getState();
  let { visibilityFilter } = store.getState();

  const visibleTodos = getVisibleTodos(todos, visibilityFilter);

  function getVisibleTodos(todos, visibilityFilter) {
    switch (visibilityFilter) {
      case "SHOW_ALL":
        return todos;
      case "SHOW_COMPLETED":
        return todos.filter((t) => t.completed);
      case "SHOW_ACTIVE":
        return todos.filter((t) => !t.completed);
    }
  }

  function onAddClick(todo) {
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
      <AddTodo onAddClick={onAddClick} />
      <TodoList
        todos={visibleTodos}
        onTodoClick={(id) =>
          store.dispatch({ type: "TOGGLE_TODO", payload: id })
        }
      />
      <p>
        Show:
        <FilterLink
          store={store}
          filter={"SHOW_ALL"}
          currentFilter={visibilityFilter}
        >
          All{" "}
        </FilterLink>
        <FilterLink
          store={store}
          filter={"SHOW_ACTIVE"}
          currentFilter={visibilityFilter}
        >
          Active{" "}
        </FilterLink>
        <FilterLink
          store={store}
          filter={"SHOW_COMPLETED"}
          currentFilter={visibilityFilter}
        >
          Completed{" "}
        </FilterLink>
      </p>
    </div>
  );
};
