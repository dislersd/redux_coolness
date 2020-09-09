import React from "react";
import ReactDOM from "react-dom";
// ensures our save to local storage functions only runs once per second
import throttle from "lodash/throttle";
// creates context to pass store to components without needing to drill props
import { Provider } from "react-redux";

// ================ Reducers ================

import { todoApp } from "./reducers/reducers";

// ================ Store ================
import { createStore } from "redux";
// import { createStore } from "./store/store";

// const persistedState = {
//   todos: [
//     {
//       id: "0",
//       text: "Hellow World",
//       completed: false,
//     },
//   ],
//   visibilityFilter: undefined,
// };

import { loadState, saveState } from "./Utils/localStorage";
const persistedState = loadState();
const store = createStore(todoApp, persistedState);
console.log(store.getState());

store.subscribe(
  throttle(() => {
    saveState({
      todos: store.getState().todos,
    });
  }),
  1000
);

// ================ Components ================

import App from "./App.js";
// import Provider from "./components/Provider";

// Legacy Context API - YOU HAVE TO DEFINE THE PROPTYPES OF THE CONTEXT WUT??
// Provider.childContextTypes = {
//   store: PropTypes.object,
// };

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
