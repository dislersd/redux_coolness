import React, { Component } from "react";
import Link from "./Link";

class FilterLink extends Component {
  componentDidMount() {
    const { store } = this.props;
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const state = this.props.store.getState();
    const { store, filter, children } = this.props;

    const onFilterClick = () => {
      store.dispatch({
        type: "SET_VISIBILITY_FILTER",
        filter,
      });
    };

    return (
      <Link active={filter === state.visibilityFilter} onClick={onFilterClick}>
        {children}
      </Link>
    );
  }
}

export default FilterLink;
