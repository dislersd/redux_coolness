import React from "react";
import AddTodo from "./components/AddTodo";
import Footer from "./components/Footer";
import VisibleTodoList from "./components/VisibleTodoList";

// destructuring props.match.params.filter
const App = ({
  match: {
    params: { filter },
  },
}) => {
  console.log(filter);
  return (
    <>
      <AddTodo />
      <VisibleTodoList filter={filter || "all"} />
      <Footer />
    </>
  );
};

export default App;
