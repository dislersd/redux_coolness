import React from "react";
import App from "../App";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

function Root({ store }) {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/:filter?" component={App} />
      </Router>
    </Provider>
  );
}

export default Root;
