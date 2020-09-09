import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions";

let AddTodo = ({ dispatch }) => {
  const [todo, setTodo] = useState("");

  return (
    <div>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        onClick={() => {
          dispatch(addTodo(todo));
          setTodo("");
        }}
      >
        Add Todo
      </button>
    </div>
  );
};

AddTodo = connect()(AddTodo);

export default AddTodo;
