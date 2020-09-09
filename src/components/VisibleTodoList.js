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

// You can define mapDispatchToProps like this and pass it into the connect function OR
// pass in an object like I have done below

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onTodoClick(id) {
//       dispatch(toggleTodo(id));
//     },
//   };
// };

const VisibleTodoList = withRouter(
  connect(mapStateToProps, { onTodoClick: toggleTodo })(TodoList)
);

export default VisibleTodoList;
