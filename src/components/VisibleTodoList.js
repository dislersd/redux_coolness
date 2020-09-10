import TodoList from "./TodoList";
import { connect } from "react-redux";
import { toggleTodo } from "../actions";
import { withRouter } from "react-router-dom";
import { getVisibleTodos } from "../reducers";

const mapStateToProps = (state, { match: { params } }) => {
  return { todos: getVisibleTodos(state, params.filter || "all") };
};

const VisibleTodoList = withRouter(
  connect(mapStateToProps, { onTodoClick: toggleTodo })(TodoList)
);

export default VisibleTodoList;

// You can define mapDispatchToProps like this and pass it into the connect function OR
// pass in an object like I have done below

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onTodoClick(id) {
//       dispatch(toggleTodo(id));
//     },
//   };
// };
