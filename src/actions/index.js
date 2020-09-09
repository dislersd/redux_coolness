import { v4 } from "uuid";

export const addTodo = (text) => {
  let newTodo = {
    id: v4(),
    text,
  };
  return { type: "ADD_TODO", todo: newTodo };
};

export const setVisibilityFilter = (filter) => ({
  type: "SET_VISIBILITY_FILTER",
  filter,
});

export const toggleTodo = (id) => ({ type: "TOGGLE_TODO", id });
