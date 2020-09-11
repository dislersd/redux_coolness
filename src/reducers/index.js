import { combineReducers } from "redux";
import byId, * as fromById from "./byId";
import createList, * as fromList from "./createList";

const listByFilter = combineReducers({
  all: createList("all"),
  active: createList("active"),
  completed: createList("completed"),
});

const todos = combineReducers({
  byId,
  listByFilter,
});

export default todos;

// const getAllTodos = (state) => state.allIds.map((id) => state.byId[id]);

// ========= Selectors =========

export const getVisibleTodos = (state, filter) => {
  const ids = fromList.getIds(state.listByFilter[filter]);
  return ids.map((id) => fromById.getTodo(state.byId, [id]));

  // This way works to get filtered todos, however it's best practice to use "selectors" such as fromList.getIds() and fromById.getTodo()
  // which are co-located with the reducers that they derive state from. This ensures encapsulation.

  // return state.listByFilter[filter].map((id) =>
  //   fromById.getTodo(state.byId, [id])
  // );
};

export const getIsFetching = (state, filter) =>
  fromList.getIsFetching(state.listByFilter[filter]);
