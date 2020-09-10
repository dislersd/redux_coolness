import React from "react";
import Todo from "./Todo";

function TodoList({ todos, toggleTodo }) {
  return (
    <ul>
      {todos.map((todo) => (
        <Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id)} />
      ))}
    </ul>
  );
}

export default TodoList;
