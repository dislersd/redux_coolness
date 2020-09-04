import React, { useState } from "react";
import ReactDOM from "react-dom";

const counter = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      console.log("boom");
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: action.payload.id,
          text: action.payload.text,
          completed: false,
        },
      ];
    case "TOGGLE_TODO":
      return state.map((todo) => {
        if (todo.id !== action.payload) {
          return todo;
        }
        return {
          ...todo,
          completed: !todo.completed,
        };
      });
    default:
      return state;
  }
};

const createStore = (reducer) => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  dispatch({});

  return { getState, dispatch, subscribe };
};

const store = createStore(todos);

const Todos = ({ todos, addTodo, toggleTodo }) => {
  const [todo, setTodo] = useState("");
  const [id, setId] = useState(0);

  function handleSubmit() {
    let newTodo = {
      id,
      text: todo,
    };

    setId((oldId) => oldId + 1);

    addTodo(newTodo);
  }

  return (
    <div>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={handleSubmit}> Add Todo </button>
      <ul>
        {todos.map((todo, i) => (
          <li
            key={todo.id}
            onClick={() => {
              toggleTodo(todo.id);
            }}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

const Counter = ({ value, onIncrement, onDecrement }) => (
  <div>
    <h1>{value}</h1>
    <button onClick={onIncrement}>+</button>
    <button onClick={onDecrement}>-</button>
  </div>
);

const App = () => {
  return (
    <>
      <Todos
        todos={store.getState()}
        addTodo={(todo) => store.dispatch({ type: "ADD_TODO", payload: todo })}
        toggleTodo={(id) =>
          store.dispatch({ type: "TOGGLE_TODO", payload: id })
        }
      />
      {/* <Counter
        value={store.getState()}
        onIncrement={() => store.dispatch({ type: "INCREMENT" })}
        onDecrement={() => store.dispatch({ type: "DECREMENT" })}
      /> */}
    </>
  );
};

const render = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

store.subscribe(render);
render();
