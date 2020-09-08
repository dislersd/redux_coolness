import React from "react";
import { TodoApp } from "./components/TodoApp";

const App = ({ store }) => {
  return <TodoApp store={store} />;
};

export default App;
