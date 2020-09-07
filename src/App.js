import React from "react";
import { Todos } from "./components/Todo";

const App = ({ store }) => {
  return <Todos store={store} />;
};

export default App;
