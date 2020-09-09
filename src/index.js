import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

// ================ Reducers ================

import { todoApp } from "./reducers/reducers";

// ================ Store ================

import { createStore } from "./store/store";

// ================ Components ================

import App from "./App.js";
// import Provider from "./components/Provider";

// Legacy Context API - YOU HAVE TO DEFINE THE PROPTYPES OF THE CONTEXT WUT??
// Provider.childContextTypes = {
//   store: PropTypes.object,
// };

ReactDOM.render(
  <Provider store={createStore(todoApp)}>
    <App />
  </Provider>,
  document.getElementById("root")
);
