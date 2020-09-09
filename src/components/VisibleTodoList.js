import TodoList from "./TodoList";
import { connect } from "react-redux";
import { toggleTodo } from "../actions";

const getVisibleTodos = (todos, visibilityFilter) => {
  switch (visibilityFilter) {
    case "SHOW_ALL":
      return todos;
    case "SHOW_COMPLETED":
      return todos.filter((t) => t.completed);
    case "SHOW_ACTIVE":
      return todos.filter((t) => !t.completed);
  }
};

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id));
    },
  };
};

const VisibleTodoList = connect(mapStateToProps, mapDispatchToProps)(TodoList);

export default VisibleTodoList;

// ** Container component without using connect method to get props from redux store **

// class VisibleTodoList extends Component {
//   componentDidMount() {
//     const { store } = this.context;
//     this.unsubscribe = store.subscribe(() => this.forceUpdate());
//     console.log("Current State - CDM VIS TODO LIST");
//     console.log(store.getState());
//     console.log("--------------");
//   }

//   componentWillUnmount() {
//     this.unsubscribe();
//     console.log("Current State - UNMOUNT VIS TODO LIST");
//     console.log(store.getState());
//     console.log("--------------");
//   }

//   getVisibleTodos(todos, visibilityFilter) {
//     switch (visibilityFilter) {
//       case "SHOW_ALL":
//         return todos;
//       case "SHOW_COMPLETED":
//         return todos.filter((t) => t.completed);
//       case "SHOW_ACTIVE":
//         return todos.filter((t) => !t.completed);
//     }
//   }

//   render() {
//     const { store } = this.context;
//     const state = store.getState();

//     const onTodoClick = (id) => {
//       store.dispatch({ type: "TOGGLE_TODO", id });
//     };

//     return (
//       <TodoList
//         todos={this.getVisibleTodos(state.todos, state.visibilityFilter)}
//         onTodoClick={onTodoClick}
//       />
//     );
//   }
// }

// VisibleTodoList.contextTypes = {
//   store: PropTypes.object,
// };
