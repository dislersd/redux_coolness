import React, { useState } from "react";
import ReactDOM from "react-dom";
// import { combineReducers } from "redux";

// ================ Reducers ================

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

// single todo reducer - only handles changes for single todos
const todo = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        id: action.payload.id,
        text: action.payload.text,
        completed: false,
      };
    case "TOGGLE_TODO":
      if (state.id !== action.payload) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed,
      };
    default:
      return state;
  }
};

// todos array reducer - handles changes for the list of arrays - uses the single "todo" reducer within it's switch cases
const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, todo(undefined, action)];
    case "TOGGLE_TODO":
      return state.map((t) => todo(t, action));
    default:
      return state;
  }
};

const visibilityFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.payload;
    default:
      return state;
  }
};

// const todoApp = (state = {}, action) => {
//   return {
//     todos: todos(state.todos, action),
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//   };
// };

// Refactored top level reducer to use "combineReducers" funtion
// combineReducers from scratch
const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
};

const todoApp = combineReducers({
  todos,
  visibilityFilter,
});

// ================ Store ================
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

const store = createStore(todoApp);

// ================ Components ================
const Todos = ({ todos, addTodo, toggleTodo, toggleCompleted, filter }) => {
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
      <button
        onClick={() => {
          toggleCompleted(
            filter === "SHOW_ALL" ? "SHOW_COMPLETED" : "SHOW_ALL"
          );
          console.log(store.getState());
        }}
      >
        toggle completed
      </button>
      <div>Visibility: {filter}</div>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={handleSubmit}> Add Todo </button>
      {todos ? (
        <ul>
          {todos.map((todo) => (
            <li
              key={todo.id}
              onClick={() => {
                toggleTodo(todo.id);
              }}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </li>
          ))}
        </ul>
      ) : (
        <div>add a todo</div>
      )}
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
        todos={store.getState().todos}
        filter={store.getState().visibilityFilter}
        addTodo={(todo) => store.dispatch({ type: "ADD_TODO", payload: todo })}
        toggleTodo={(id) =>
          store.dispatch({ type: "TOGGLE_TODO", payload: id })
        }
        toggleCompleted={(filter) =>
          store.dispatch({
            type: "SET_VISIBILITY_FILTER",
            payload: filter,
          })
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

console.log("Current State");
console.log(store.getState());
console.log("--------------");
