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

export const getVisibleTodos = (state, visibilityFilter) => {
  switch (visibilityFilter) {
    case "all":
      return state;
    case "completed":
      return state.filter((t) => t.completed);
    case "active":
      return state.filter((t) => !t.completed);
  }
};

export default todos;
