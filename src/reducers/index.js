const counter = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      console.log("boom");
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

// single todo reducer - only handles changes for single todos
const todo = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        id: action.todo.id,
        text: action.todo.text,
        completed: false,
      };
    case "TOGGLE_TODO":
      if (state.id !== action.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed,
      };
    default:
      return state;
  }
};

// todos array reducer - handles changes for the list of arrays - uses the single "todo" reducer within it's switch cases
const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, todo(undefined, action)];
    case "TOGGLE_TODO":
      return state.map((t) => todo(t, action));
    default:
      return state;
  }
};

// const todoApp = (state = {}, action) => {
//   return {
//     todos: todos(state.todos, action),
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//   };
// };

// Refactored top level reducer to use "combineReducers" function

// combineReducers function built from scratch
const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
};

export const todoApp = combineReducers({
  todos,
});
