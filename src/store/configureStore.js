import { createStore } from "redux";
import todoApp from "../reducers";
import { loadState, saveState } from "../Utils/localStorage";
// throttle ensures our save to local storage function only runs once per second
import throttle from "lodash/throttle";

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

const configureStore = () => {
  const persistedState = loadState();
  const store = createStore(todoApp, persistedState);
  console.log(store.getState());
  if (process.env.NODE_ENV !== "production") {
    store.dispatch = addLoggingToDispatch(store);
  }

  store.subscribe(
    throttle(() => {
      saveState({
        todos: store.getState().todos,
      });
    }),
    1000
  );

  return store;
};

export default configureStore;
