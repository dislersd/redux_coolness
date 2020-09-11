import React, { Component } from "react";
import TodoList from "./TodoList";
import { connect } from "react-redux";
import * as actions from "../actions";
import { withRouter } from "react-router-dom";
import { getVisibleTodos, getIsFetching } from "../reducers";

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
    const { filter, requestTodos, fetchTodos } = this.props;
    requestTodos(filter);
    fetchTodos(filter);
  }

  render() {
    const { todos, isFetching } = this.props;
    if (isFetching && !todos.length) {
      console.log("HEYHOOO");
      return <p>Loading...</p>;
    }
    return <TodoList {...this.props} />;
  }
}
// destructuring nested filter from props.match.params.filter -> { match: { params } }
const mapStateToProps = (state, { match: { params } }) => {
  const filter = params.filter || "all";
  return {
    todos: getVisibleTodos(state, filter),
    isFetching: getIsFetching(state, filter),
    filter,
  };
};

VisibleTodoList = withRouter(
  connect(mapStateToProps, actions)(VisibleTodoList)
);

export default VisibleTodoList;
