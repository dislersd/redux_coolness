import { createStore } from "redux";
import todoApp from "../reducers";

const addLoggingToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  return (action) => {
    console.group(action.type);
    console.log("%c prev state", "color: gray", store.getState());
    console.log("%c action", "color: red", action);
    const returnValue = rawDispatch(action);
    console.log("%c next state", "color: green", store.getState());
    console.groupEnd(action.type);
    return returnValue;
  };
};

const addPromiseSupportToDispatch = (store) => {
  const rawDispatch = store.dispatch;
  return (action) => {
    if (typeof action.then === "function") {
      return action.then(rawDispatch);
    }
    return rawDispatch(action);
  };
};

const configureStore = () => {
  const store = createStore(
    todoApp,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  console.log(store.getState());

  if (process.env.NODE_ENV !== "production") {
    store.dispatch = addLoggingToDispatch(store);
  }

  store.dispatch = addPromiseSupportToDispatch(store);

  return store;
};

export default configureStore;
