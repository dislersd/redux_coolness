import { createStore } from "redux";
import { todoApp } from "../reducers";
import { loadState, saveState } from "../Utils/localStorage";
// throttle ensures our save to local storage function only runs once per second
import throttle from "lodash/throttle";

const configureStore = () => {
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

  return store;
};

export default configureStore;
