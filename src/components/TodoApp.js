import React from "react";
import AddTodo from "./AddTodo";
import Footer from "./Footer";
import VisibleTodoList from "./VisibleTodoList";

export const TodoApp = ({ store }) => {
  return (
    <>
      <AddTodo store={store} />
      <VisibleTodoList store={store} />
      <Footer store={store} />
    </>
  );
};
