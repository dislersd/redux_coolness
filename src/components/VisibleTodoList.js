import React, { Component } from "react";
import TodoList from "./TodoList";
import { connect } from "react-redux";
import * as actions from "../actions";
import { withRouter } from "react-router-dom";
import { getVisibleTodos } from "../reducers";

class VisibleTodoList extends Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchTodos } = this.props;
    fetchTodos(filter);
  }

  render() {
    return <TodoList {...this.props} />;
  }
}
// destructuring nested filter from props.match.params.filter -> { match: { params } }
const mapStateToProps = (state, { match: { params } }) => {
  const filter = params.filter || "all";
  return {
    todos: getVisibleTodos(state, filter),
    filter,
  };
};

VisibleTodoList = withRouter(
  connect(mapStateToProps, actions)(VisibleTodoList)
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
