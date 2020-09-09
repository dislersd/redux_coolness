import { Component } from "react";

export class Provider extends Component {
  getChildContext() {
    return {
      store: this.props.store,
    };
  }

  render() {
    console.log("*** PROVIDER RENDER ***");
    console.log("--------------");

    return this.props.children;
  }
}

export default Provider;
