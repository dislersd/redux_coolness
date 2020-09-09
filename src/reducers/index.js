import { combineReducers } from "redux";
import todos, * as fromTodos from "./todos";
todos;

// combineReducers function built from scratch

// const combineReducers = (reducers) => {
//   return (state = {}, action) => {
//     return Object.keys(reducers).reduce((nextState, key) => {
//       nextState[key] = reducers[key](state[key], action);
//       return nextState;
//     }, {});
//   };
// };

const todoApp = combineReducers({
  todos,
});

export default todoApp;

export const getVisibleTodos = (state, filter) =>
  fromTodos.getVisibleTodos(state.todos, filter);
