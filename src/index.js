import React, { useState } from "react";
import ReactDOM from "react-dom";
// import { combineReducers } from "redux";

// ================ Reducers ================

import { todoApp } from "./reducers/reducers";

// ================ Store ================

import { createStore } from "./store/store";
const store = createStore(todoApp);

// ================ Components ================
import App from "./App.js";

const render = () => {
  ReactDOM.render(<App store={store} />, document.getElementById("root"));
  console.log("Current State");
  console.log(store.getState());
  console.log("--------------");
};

store.subscribe(render);
render();
