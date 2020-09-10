import { createStore, applyMiddleware } from "redux";
import todoApp from "../reducers";
import promise from "redux-promise";
import { createLogger } from "redux-logger";

const configureStore = () => {
  const middlewares = [promise];

  if (process.env.NODE_ENV !== "production") {
    middlewares.push(createLogger());
  }

  return createStore(todoApp, applyMiddleware(...middlewares));
};

export default configureStore;

// const logger = (store) => (next) => (action) => {
//   console.group(action.type);
//   console.log("%c prev state", "color: gray", store.getState());
//   console.log("%c action", "color: red", action);
//   const returnValue = next(action);
//   console.log("%c next state", "color: green", store.getState());
//   console.groupEnd(action.type);
//   return returnValue;
// };

// const promise = (store) => (next) => (action) => {
//   if (typeof action.then === "function") {
//     return action.then(next);
//   }
//   return next(action);
// };

// const wrapDispatchWithMiddlewares = (store, middlewares) => {
//   middlewares
//     .slice()
//     .reverse()
//     .forEach(
//       (middleware) => (store.dispatch = middleware(store)(store.dispatch))
//     );
// };
