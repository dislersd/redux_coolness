import React, { useState } from "react";
import FilterLink from "./FilterLink";
import TodoList from "./TodoList";
import AddTodo from "./AddTodo";
import Footer from "./Footer";

export const TodoApp = ({ store }) => {
  const [id, setId] = useState(0);

  let { todos } = store.getState();
  let { visibilityFilter } = store.getState();

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

  function onFilterClick(filter) {
    store.dispatch({
      type: "SET_VISIBILITY_FILTER",
      payload: filter,
    });
  }

  return (
    <div>
      <AddTodo onAddClick={onAddClick} />
      <TodoList
        todos={getVisibleTodos(todos, visibilityFilter)}
        onTodoClick={(id) =>
          store.dispatch({ type: "TOGGLE_TODO", payload: id })
        }
      />
      <Footer
        visibilityFilter={visibilityFilter}
        onFilterClick={onFilterClick}
      />
    </div>
  );
};
