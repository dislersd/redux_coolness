let nextId = 1;
export const addTodo = (text) => {
  let newTodo = {
    id: nextId++,
    text,
  };
  return { type: "ADD_TODO", todo: newTodo };
};

export const setVisibilityFilter = (filter) => ({
  type: "SET_VISIBILITY_FILTER",
  filter,
});

export const toggleTodo = (id) => ({ type: "TOGGLE_TODO", id });
