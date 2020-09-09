import TodoList from "./TodoList";
import { connect } from "react-redux";
import { toggleTodo } from "../actions";
import { withRouter } from "react-router-dom";

const getVisibleTodos = (todos, visibilityFilter) => {
  switch (visibilityFilter) {
    case "all":
      return todos;
    case "completed":
      return todos.filter((t) => t.completed);
    case "active":
      return todos.filter((t) => !t.completed);
  }
};

const mapStateToProps = (state, { match: { params } }) => {
  return {
    todos: getVisibleTodos(state.todos, params.filter || "all"),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick(id) {
      dispatch(toggleTodo(id));
    },
  };
};

const VisibleTodoList = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TodoList)
);

export default VisibleTodoList;
