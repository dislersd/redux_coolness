import React, { Component } from "react";
import TodoList from "./TodoList";

export class VisibleTodoList extends Component {
  componentDidMount() {
    const { store } = this.props;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getVisibleTodos(todos, visibilityFilter) {
    switch (visibilityFilter) {
      case "SHOW_ALL":
        return todos;
      case "SHOW_COMPLETED":
        return todos.filter((t) => t.completed);
      case "SHOW_ACTIVE":
        return todos.filter((t) => !t.completed);
    }
  }

  render() {
    const state = this.props.store.getState();
    const { store } = this.props;

    const onTodoClick = (id) => {
      store.dispatch({ type: "TOGGLE_TODO", id });
    };

    return (
      <TodoList
        todos={this.getVisibleTodos(state.todos, state.visibilityFilter)}
        onTodoClick={onTodoClick}
      />
    );
  }
}

export default VisibleTodoList;
