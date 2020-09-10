import React, { Component } from "react";
import TodoList from "./TodoList";
import { connect } from "react-redux";
import { toggleTodo } from "../actions";
import { withRouter } from "react-router-dom";
import { getVisibleTodos } from "../reducers";
import { fetchTodos } from "../api";

class VisibleTodoList extends Component {
  componentDidMount() {
    fetchTodos(this.props.filter).then((todos) =>
      console.log(this.props.filter, todos)
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.filter !== prevProps.filter) {
      fetchTodos(this.props.filter).then((todos) =>
        console.log(this.props.filter, todos)
      );
    }
  }

  render() {
    return <TodoList {...this.props} />;
  }
}

const mapStateToProps = (state, { match: { params } }) => {
  const filter = params.filter || "all";
  return {
    todos: getVisibleTodos(state, filter),
    filter,
  };
};

VisibleTodoList = withRouter(
  connect(mapStateToProps, { onTodoClick: toggleTodo })(VisibleTodoList)
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
