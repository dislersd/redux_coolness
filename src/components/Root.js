import React from "react";
import App from "../App";
import { Provider } from "react-redux";

function Root({ store }) {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

export default Root;
