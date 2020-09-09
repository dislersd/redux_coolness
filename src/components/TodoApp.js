import React from "react";
import AddTodo from "./AddTodo";
import Footer from "./Footer";
import VisibleTodoList from "./VisibleTodoList";

export const TodoApp = () => {
  return (
    <>
      <AddTodo />
      <VisibleTodoList />
      <Footer />
    </>
  );
};
