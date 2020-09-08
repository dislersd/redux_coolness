import React, { Component } from "react";
import Link from "./Link";

class FilterLink extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate());
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const props = this.props;
    const state = this.props.store.getState();

    return (
      <Link
        active={props.filter === state.visibilityFilter}
        onClick={() =>
          this.props.store.dispatch({
            type: "SET_VISIBILITY_FILTER",
            filter: props.filter,
          })
        }
      >
        {props.children}
      </Link>
    );
  }
}

export default FilterLink;
